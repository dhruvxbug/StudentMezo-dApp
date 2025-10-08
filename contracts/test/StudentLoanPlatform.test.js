const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("StudentLoanPlatform", function () {
  let musd, nft, platform;
  let owner, student, lender, verifier;

  beforeEach(async function () {
    [owner, student, lender, verifier] = await ethers.getSigners();

    // Deploy MUSD
    const MUSD = await ethers.getContractFactory("MUSD");
    musd = await MUSD.deploy();
    await musd.waitForDeployment();

    // Deploy NFT
    const StudentLoanNFT = await ethers.getContractFactory("StudentLoanNFT");
    nft = await StudentLoanNFT.deploy();
    await nft.waitForDeployment();

    // Deploy Platform
    const StudentLoanPlatform = await ethers.getContractFactory("StudentLoanPlatform");
    platform = await StudentLoanPlatform.deploy(
      await musd.getAddress(),
      await nft.getAddress()
    );
    await platform.waitForDeployment();

    // Setup permissions
    await musd.addMinter(await platform.getAddress());
    await nft.transferOwnership(await platform.getAddress());
    await platform.addVerifier(verifier.address);
  });

  describe("Student Verification", function () {
    it("Should verify a student", async function () {
      await platform.connect(verifier).verifyStudent(student.address);
      const studentData = await platform.students(student.address);
      expect(studentData.isVerified).to.equal(true);
      expect(studentData.reputationScore).to.equal(100);
    });

    it("Should not allow unverified students to request loans", async function () {
      await expect(
        platform.connect(student).requestLoan(
          ethers.parseEther("1000"),
          30 * 24 * 60 * 60,
          "Tuition fees"
        )
      ).to.be.revertedWith("Student not verified");
    });
  });

  describe("Collateral and MUSD Minting", function () {
    beforeEach(async function () {
      await platform.connect(verifier).verifyStudent(student.address);
    });

    it("Should deposit collateral and mint MUSD", async function () {
      const depositAmount = ethers.parseEther("1");
      
      await platform.connect(student).depositCollateralAndMintMUSD({ 
        value: depositAmount 
      });

      const balance = await musd.balanceOf(student.address);
      expect(balance).to.equal(depositAmount);
    });
  });

  describe("Loan Requests", function () {
    beforeEach(async function () {
      await platform.connect(verifier).verifyStudent(student.address);
    });

    it("Should create a loan request", async function () {
      const loanAmount = ethers.parseEther("1000");
      const duration = 30 * 24 * 60 * 60; // 30 days

      const tx = await platform.connect(student).requestLoan(
        loanAmount,
        duration,
        "Tuition fees"
      );

      const receipt = await tx.wait();
      const event = receipt.logs.find(
        log => log.fragment && log.fragment.name === "LoanRequested"
      );

      expect(event).to.not.be.undefined;
      
      const loan = await platform.getLoan(1);
      expect(loan.student).to.equal(student.address);
      expect(loan.amount).to.equal(loanAmount);
      expect(loan.status).to.equal(0); // PENDING
    });

    it("Should mint First Loan NFT", async function () {
      await platform.connect(student).requestLoan(
        ethers.parseEther("1000"),
        30 * 24 * 60 * 60,
        "Tuition fees"
      );

      const achievements = await nft.getUserAchievements(student.address);
      expect(achievements.length).to.equal(1);
    });
  });

  describe("Lender Pool", function () {
    it("Should allow lenders to contribute to pool", async function () {
      // Mint MUSD to lender
      await musd.mint(lender.address, ethers.parseEther("10000"));
      
      // Approve platform
      await musd.connect(lender).approve(
        await platform.getAddress(),
        ethers.parseEther("5000")
      );

      // Contribute to pool
      await platform.connect(lender).contributeToPool(ethers.parseEther("5000"));

      const stats = await platform.getLenderStats(lender.address);
      expect(stats.contributed).to.equal(ethers.parseEther("5000"));
    });
  });

  describe("Loan Funding and Repayment", function () {
    let loanId;

    beforeEach(async function () {
      // Setup student
      await platform.connect(verifier).verifyStudent(student.address);
      
      // Request loan
      const tx = await platform.connect(student).requestLoan(
        ethers.parseEther("1000"),
        30 * 24 * 60 * 60,
        "Tuition fees"
      );
      
      loanId = 1;

      // Setup lender pool
      await musd.mint(lender.address, ethers.parseEther("10000"));
      await musd.connect(lender).approve(
        await platform.getAddress(),
        ethers.parseEther("10000")
      );
      await platform.connect(lender).contributeToPool(ethers.parseEther("10000"));
    });

    it("Should fund a loan from pool", async function () {
      await platform.connect(owner).fundLoan(loanId);

      const loan = await platform.getLoan(loanId);
      expect(loan.status).to.equal(1); // ACTIVE

      const studentBalance = await musd.balanceOf(student.address);
      expect(studentBalance).to.equal(ethers.parseEther("1000"));
    });

    it("Should allow loan repayment", async function () {
      // Fund loan
      await platform.connect(owner).fundLoan(loanId);

      // Mint MUSD to student for repayment
      const totalOwed = await platform.calculateTotalOwed(loanId);
      await musd.mint(student.address, totalOwed);
      await musd.connect(student).approve(
        await platform.getAddress(),
        totalOwed
      );

      // Repay loan
      await platform.connect(student).repayLoan(loanId, totalOwed);

      const loan = await platform.getLoan(loanId);
      expect(loan.status).to.equal(2); // REPAID
    });
  });

  describe("Interest Rate Calculation", function () {
    it("Should calculate interest based on reputation", async function () {
      await platform.connect(verifier).verifyStudent(student.address);
      
      const tx = await platform.connect(student).requestLoan(
        ethers.parseEther("1000"),
        30 * 24 * 60 * 60,
        "Tuition fees"
      );

      const loan = await platform.getLoan(1);
      expect(loan.interestRate).to.be.gt(0);
      expect(loan.interestRate).to.be.lte(2000); // MAX_INTEREST_RATE
    });
  });
});
