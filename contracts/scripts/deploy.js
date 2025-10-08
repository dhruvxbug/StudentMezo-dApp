const hre = require("hardhat");

async function main() {
  console.log("Deploying StudentMezo DApp contracts...");

  // Deploy MUSD Token
  console.log("Deploying MUSD token...");
  const MUSD = await hre.ethers.getContractFactory("MUSD");
  const musd = await MUSD.deploy();
  await musd.waitForDeployment();
  const musdAddress = await musd.getAddress();
  console.log(`MUSD deployed to: ${musdAddress}`);

  // Deploy StudentLoanNFT
  console.log("Deploying StudentLoanNFT...");
  const StudentLoanNFT = await hre.ethers.getContractFactory("StudentLoanNFT");
  const nft = await StudentLoanNFT.deploy();
  await nft.waitForDeployment();
  const nftAddress = await nft.getAddress();
  console.log(`StudentLoanNFT deployed to: ${nftAddress}`);

  // Deploy StudentLoanPlatform
  console.log("Deploying StudentLoanPlatform...");
  const StudentLoanPlatform = await hre.ethers.getContractFactory("StudentLoanPlatform");
  const platform = await StudentLoanPlatform.deploy(musdAddress, nftAddress);
  await platform.waitForDeployment();
  const platformAddress = await platform.getAddress();
  console.log(`StudentLoanPlatform deployed to: ${platformAddress}`);

  // Setup permissions
  console.log("Setting up permissions...");
  
  // Add platform as minter for MUSD
  await musd.addMinter(platformAddress);
  console.log("Platform added as MUSD minter");
  
  // Transfer NFT ownership to platform
  await nft.transferOwnership(platformAddress);
  console.log("NFT ownership transferred to platform");

  console.log("\n=== Deployment Summary ===");
  console.log(`MUSD: ${musdAddress}`);
  console.log(`StudentLoanNFT: ${nftAddress}`);
  console.log(`StudentLoanPlatform: ${platformAddress}`);
  console.log("===========================\n");

  // Save deployment addresses
  const fs = require("fs");
  const deploymentData = {
    network: hre.network.name,
    timestamp: new Date().toISOString(),
    contracts: {
      MUSD: musdAddress,
      StudentLoanNFT: nftAddress,
      StudentLoanPlatform: platformAddress
    }
  };

  fs.writeFileSync(
    "deployment-addresses.json",
    JSON.stringify(deploymentData, null, 2)
  );
  console.log("Deployment addresses saved to deployment-addresses.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
