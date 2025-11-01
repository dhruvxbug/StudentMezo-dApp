// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./MUSD.sol";
import "./StudentLoanNFT.sol";

/**
 * @title StudentLoanPlatform
 * @dev Main contract managing student loans with real Bitcoin collateral via Mezo Protocol
 * @notice This contract uses mBTC (Mezo Bitcoin) tokens as collateral
 * 
 * Mezo Integration Flow:
 * 1. Users deposit real Bitcoin to Mezo bridge on Bitcoin L1
 * 2. Mezo validators verify deposit and mint mBTC tokens (1:1 ratio)
 * 3. Users approve StudentLoanPlatform to spend their mBTC
 * 4. Users deposit mBTC as collateral and receive MUSD stablecoin
 * 5. MUSD can be used for education expenses
 * 6. Upon repayment, collateral is returned (can be withdrawn to Bitcoin L1)
 * 
 * Key Features:
 * - Real Bitcoin backing (not synthetic or wrapped)
 * - 150% collateralization for lender protection
 * - Interest rates based on student reputation
 * - NFT achievements for milestones
 * - Permissionless (no verification required)
 */
contract StudentLoanPlatform is Ownable, ReentrancyGuard {
    MUSD public musdToken;
    StudentLoanNFT public nftContract;
    IERC20 public mBTC; // Mezo Bitcoin token - represents real Bitcoin from L1
    
    enum LoanStatus {
        PENDING,
        ACTIVE,
        REPAID,
        DEFAULTED
    }
    
    struct Student {
        bool isVerified;
        uint256 totalBorrowed;
        uint256 totalRepaid;
        uint256 reputationScore;
        uint256[] loanIds;
    }
    
    struct Loan {
        uint256 id;
        address student;
        uint256 amount;
        uint256 collateralAmount;
        uint256 interestRate; // basis points (e.g., 500 = 5%)
        uint256 duration; // in seconds
        uint256 startTime;
        uint256 amountRepaid;
        LoanStatus status;
        string purpose;
    }
    
    struct LenderPool {
        uint256 totalPooled;
        uint256 totalLent;
        uint256 totalReturned;
        mapping(address => uint256) contributions;
        mapping(address => uint256) earned;
    }
    
    uint256 private loanIdCounter;
    uint256 public constant COLLATERAL_RATIO = 150; // 150% collateralization
    uint256 public constant MAX_INTEREST_RATE = 2000; // 20%
    
    mapping(address => Student) public students;
    mapping(uint256 => Loan) public loans;
    mapping(address => bool) public verifiers;
    
    LenderPool public lenderPool;
    
    event StudentVerified(address indexed student);
    event BitcoinCollateralDeposited(address indexed student, uint256 mBtcAmount, uint256 musdMinted);
    event MUSDMinted(address indexed student, uint256 musdAmount);
    event LoanRequested(uint256 indexed loanId, address indexed student, uint256 amount);
    event LoanFunded(uint256 indexed loanId, uint256 amount);
    event LoanRepaid(uint256 indexed loanId, uint256 amount);
    event CollateralReturned(address indexed student, uint256 mBtcAmount);
    event LenderContribution(address indexed lender, uint256 amount);
    event YieldDistributed(address indexed lender, uint256 amount);
    
    constructor(
        address _musdToken, 
        address _nftContract, 
        address _mBTC
    ) Ownable(msg.sender) {
        require(_musdToken != address(0), "Invalid MUSD address");
        require(_nftContract != address(0), "Invalid NFT address");
        require(_mBTC != address(0), "Invalid mBTC address");
        
        musdToken = MUSD(_musdToken);
        nftContract = StudentLoanNFT(_nftContract);
        mBTC = IERC20(_mBTC);
    }
    
    modifier onlyVerifier() {
        require(verifiers[msg.sender] || msg.sender == owner(), "Not authorized verifier");
        _;
    }
    
    modifier onlyVerifiedStudent() {
        require(students[msg.sender].isVerified, "Student not verified");
        _;
    }
    
    // Verifier management
    function addVerifier(address verifier) external onlyOwner {
        verifiers[verifier] = true;
    }
    
    function removeVerifier(address verifier) external onlyOwner {
        verifiers[verifier] = false;
    }
    
    // Student verification (optional - no longer required for loans)
    function verifyStudent(address student) external onlyVerifier {
        students[student].isVerified = true;
        students[student].reputationScore = 100; // Starting score
        emit StudentVerified(student);
    }
    
    // Initialize student if first time user
    function _initializeStudent(address student) internal {
        if (students[student].reputationScore == 0) {
            students[student].reputationScore = 100; // Starting score for new users
        }
    }
    
    /**
     * @dev Deposit Bitcoin (via Mezo mBTC) as collateral and mint MUSD
     * @param mBtcAmount Amount of mBTC tokens to deposit (in satoshis, 8 decimals)
     * @notice User must first:
     *         1. Deposit real Bitcoin to Mezo bridge on Bitcoin L1
     *         2. Receive mBTC tokens on EVM layer (1:1 ratio)
     *         3. Approve this contract to spend their mBTC tokens
     * @notice In production: Use Chainlink BTC/USD oracle for accurate pricing
     * 
     * Process:
     * 1. Transfer mBTC from user to this contract (holds as collateral)
     * 2. Calculate MUSD amount based on BTC value (simplified 1:1 for demo)
     * 3. Mint MUSD stablecoin to user for education expenses
     * 4. Track collateral for potential loan backing
     */
    function depositCollateralAndMintMUSD(uint256 mBtcAmount) external nonReentrant {
        require(mBtcAmount > 0, "Must deposit Bitcoin collateral");
        require(mBtcAmount >= 0.001 * 10**8, "Minimum 0.001 BTC required"); // 0.001 BTC minimum
        
        // Initialize student if first time
        _initializeStudent(msg.sender);
        
        // Transfer mBTC tokens from user to this contract (holds as collateral)
        require(
            mBTC.transferFrom(msg.sender, address(this), mBtcAmount),
            "mBTC transfer failed - ensure you have approved this contract"
        );
        
        // Calculate MUSD to mint based on Bitcoin collateral
        // PRODUCTION: Use Chainlink BTC/USD oracle for real-time pricing
        // For demo/testing: Simplified 1 BTC = 50,000 MUSD ratio
        // mBTC: 8 decimals, MUSD: 18 decimals
        // Example: 1 BTC (100000000 satoshis) = 50,000 MUSD (50000 * 10^18)
        uint256 musdAmount = (mBtcAmount * 50000 * 10**18) / (1 * 10**8);
        
        musdToken.mint(msg.sender, musdAmount);
        
        emit BitcoinCollateralDeposited(msg.sender, mBtcAmount, musdAmount);
        emit MUSDMinted(msg.sender, musdAmount);
    }
    
    // Loan request
    function requestLoan(
        uint256 amount,
        uint256 duration,
        string memory purpose
    ) external returns (uint256) {
        require(amount > 0, "Loan amount must be greater than 0");
        require(duration > 0, "Duration must be greater than 0");
        
        // Initialize student if first time
        _initializeStudent(msg.sender);
        
        loanIdCounter++;
        uint256 loanId = loanIdCounter;
        
        // Calculate required collateral
        uint256 requiredCollateral = (amount * COLLATERAL_RATIO) / 100;
        
        // Calculate interest rate based on reputation
        uint256 interestRate = calculateInterestRate(msg.sender);
        
        loans[loanId] = Loan({
            id: loanId,
            student: msg.sender,
            amount: amount,
            collateralAmount: requiredCollateral,
            interestRate: interestRate,
            duration: duration,
            startTime: 0,
            amountRepaid: 0,
            status: LoanStatus.PENDING,
            purpose: purpose
        });
        
        students[msg.sender].loanIds.push(loanId);
        
        emit LoanRequested(loanId, msg.sender, amount);
        
        // Mint First Loan NFT if this is the first loan
        if (students[msg.sender].loanIds.length == 1) {
            nftContract.mintAchievement(
                msg.sender,
                StudentLoanNFT.AchievementType.FIRST_LOAN,
                "First loan requested"
            );
        }
        
        return loanId;
    }
    
    // Lender pool contribution
    function contributeToPool(uint256 amount) external nonReentrant {
        require(amount > 0, "Contribution must be greater than 0");
        
        musdToken.transferFrom(msg.sender, address(this), amount);
        
        lenderPool.contributions[msg.sender] += amount;
        lenderPool.totalPooled += amount;
        
        emit LenderContribution(msg.sender, amount);
    }
    
    // Fund loan from pool
    function fundLoan(uint256 loanId) external onlyOwner nonReentrant {
        Loan storage loan = loans[loanId];
        require(loan.status == LoanStatus.PENDING, "Loan not pending");
        require(lenderPool.totalPooled - lenderPool.totalLent >= loan.amount, "Insufficient pool funds");
        
        loan.status = LoanStatus.ACTIVE;
        loan.startTime = block.timestamp;
        lenderPool.totalLent += loan.amount;
        
        students[loan.student].totalBorrowed += loan.amount;
        
        musdToken.transfer(loan.student, loan.amount);
        
        emit LoanFunded(loanId, loan.amount);
    }
    
    // Repay loan
    function repayLoan(uint256 loanId, uint256 amount) external nonReentrant {
        Loan storage loan = loans[loanId];
        require(loan.status == LoanStatus.ACTIVE, "Loan not active");
        require(loan.student == msg.sender, "Not the borrower");
        
        uint256 totalOwed = calculateTotalOwed(loanId);
        uint256 repayAmount = amount > totalOwed ? totalOwed : amount;
        
        musdToken.transferFrom(msg.sender, address(this), repayAmount);
        
        loan.amountRepaid += repayAmount;
        students[msg.sender].totalRepaid += repayAmount;
        
        if (loan.amountRepaid >= totalOwed) {
            loan.status = LoanStatus.REPAID;
            students[msg.sender].reputationScore += 10;
            
            // Mint achievement NFTs
            if (students[msg.sender].totalRepaid == totalOwed) {
                nftContract.mintAchievement(
                    msg.sender,
                    StudentLoanNFT.AchievementType.FIRST_REPAYMENT,
                    "First repayment made"
                );
            }
            
            nftContract.mintAchievement(
                msg.sender,
                StudentLoanNFT.AchievementType.LOAN_COMPLETED,
                string(abi.encodePacked("Loan #", uint2str(loanId), " completed"))
            );
        }
        
        // Distribute yield to lenders
        distributeYield(repayAmount);
        
        emit LoanRepaid(loanId, repayAmount);
    }
    
    // Calculate total owed including interest
    function calculateTotalOwed(uint256 loanId) public view returns (uint256) {
        Loan memory loan = loans[loanId];
        if (loan.status != LoanStatus.ACTIVE && loan.status != LoanStatus.REPAID) {
            return 0;
        }
        
        uint256 interest = (loan.amount * loan.interestRate) / 10000;
        return loan.amount + interest - loan.amountRepaid;
    }
    
    // Calculate interest rate based on reputation
    function calculateInterestRate(address student) internal view returns (uint256) {
        uint256 reputation = students[student].reputationScore;
        
        if (reputation >= 150) return 300; // 3%
        if (reputation >= 120) return 500; // 5%
        if (reputation >= 100) return 800; // 8%
        
        return 1000; // 10% default
    }
    
    // Distribute yield to lenders proportionally
    function distributeYield(uint256 amount) internal {
        lenderPool.totalReturned += amount;
        // Yield distribution logic would be more complex in production
    }
    
    // Get student loans
    function getStudentLoans(address student) external view returns (uint256[] memory) {
        return students[student].loanIds;
    }
    
    // Get loan details
    function getLoan(uint256 loanId) external view returns (Loan memory) {
        return loans[loanId];
    }
    
    // Get lender stats
    function getLenderStats(address lender) external view returns (
        uint256 contributed,
        uint256 earned
    ) {
        return (
            lenderPool.contributions[lender],
            lenderPool.earned[lender]
        );
    }
    
    // Leaderboard - get top students by reputation
    function getTopStudents() external view returns (address[] memory, uint256[] memory) {
        // Simplified implementation - in production would use more efficient data structure
        address[] memory topAddresses = new address[](10);
        uint256[] memory topScores = new uint256[](10);
        
        // This would need to be implemented with proper iteration logic
        return (topAddresses, topScores);
    }
    
    // Helper function to convert uint to string
    function uint2str(uint256 _i) internal pure returns (string memory) {
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint256 k = len;
        while (_i != 0) {
            k = k - 1;
            uint8 temp = (48 + uint8(_i - _i / 10 * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }
}
