const hre = require("hardhat");

async function main() {
  console.log("Deploying StudentMezo DApp contracts with Mezo Bitcoin integration...");

  // Step 1: Deploy mBTC (Mezo Bitcoin Token)
  console.log("\n[1/5] Deploying mBTC (Mezo Bitcoin)...");
  const WrappedBTC = await hre.ethers.getContractFactory("WrappedBTC");
  const mBTC = await WrappedBTC.deploy();
  await mBTC.waitForDeployment();
  const mBtcAddress = await mBTC.getAddress();
  console.log(`✓ mBTC deployed to: ${mBtcAddress}`);

  // Step 2: Deploy Mezo Bridge
  console.log("\n[2/5] Deploying Mezo Bridge...");
  const MezoBridge = await hre.ethers.getContractFactory("MezoBridge");
  const bridge = await MezoBridge.deploy(mBtcAddress);
  await bridge.waitForDeployment();
  const bridgeAddress = await bridge.getAddress();
  console.log(`✓ Mezo Bridge deployed to: ${bridgeAddress}`);

  // Step 3: Deploy MUSD Token
  console.log("\n[3/5] Deploying MUSD stablecoin...");
  const MUSD = await hre.ethers.getContractFactory("MUSD");
  const musd = await MUSD.deploy();
  await musd.waitForDeployment();
  const musdAddress = await musd.getAddress();
  console.log(`✓ MUSD deployed to: ${musdAddress}`);

  // Step 4: Deploy StudentLoanNFT
  console.log("\n[4/5] Deploying StudentLoanNFT...");
  const StudentLoanNFT = await hre.ethers.getContractFactory("StudentLoanNFT");
  const nft = await StudentLoanNFT.deploy();
  await nft.waitForDeployment();
  const nftAddress = await nft.getAddress();
  console.log(`✓ StudentLoanNFT deployed to: ${nftAddress}`);

  // Step 5: Deploy StudentLoanPlatform with mBTC
  console.log("\n[5/5] Deploying StudentLoanPlatform...");
  const StudentLoanPlatform = await hre.ethers.getContractFactory("StudentLoanPlatform");
  const platform = await StudentLoanPlatform.deploy(musdAddress, nftAddress, mBtcAddress);
  await platform.waitForDeployment();
  const platformAddress = await platform.getAddress();
  console.log(`✓ StudentLoanPlatform deployed to: ${platformAddress}`);

  // Setup permissions
  console.log("\n⚙️  Setting up permissions...");
  
  // Authorize bridge to mint/burn mBTC
  await mBTC.addBridge(bridgeAddress);
  console.log("✓ Bridge authorized to mint/burn mBTC");
  
  // Add platform as minter for MUSD
  await musd.addMinter(platformAddress);
  console.log("✓ Platform added as MUSD minter");
  
  // Transfer NFT ownership to platform
  await nft.transferOwnership(platformAddress);
  console.log("✓ NFT ownership transferred to platform");

  console.log("\n" + "=".repeat(60));
  console.log("🎉 DEPLOYMENT SUCCESSFUL - StudentMezo DApp");
  console.log("=".repeat(60));
  console.log("\n📦 Contract Addresses:");
  console.log(`   mBTC (Mezo Bitcoin):    ${mBtcAddress}`);
  console.log(`   Mezo Bridge:            ${bridgeAddress}`);
  console.log(`   MUSD Stablecoin:        ${musdAddress}`);
  console.log(`   StudentLoanNFT:         ${nftAddress}`);
  console.log(`   StudentLoanPlatform:    ${platformAddress}`);
  console.log("\n🔗 Integration Flow:");
  console.log("   1. Users deposit real Bitcoin to Mezo Bridge on Bitcoin L1");
  console.log("   2. Bridge mints mBTC tokens on EVM layer (1:1 ratio)");
  console.log("   3. Users deposit mBTC to StudentLoanPlatform as collateral");
  console.log("   4. Platform mints MUSD stablecoin for education expenses");
  console.log("   5. Students repay loans and retrieve mBTC collateral");
  console.log("   6. Users can withdraw mBTC back to Bitcoin L1 via Bridge");
  console.log("\n" + "=".repeat(60) + "\n");

  // Save deployment addresses
  const fs = require("fs");
  const deploymentData = {
    network: hre.network.name,
    timestamp: new Date().toISOString(),
    contracts: {
      mBTC: mBtcAddress,
      MezoBridge: bridgeAddress,
      MUSD: musdAddress,
      StudentLoanNFT: nftAddress,
      StudentLoanPlatform: platformAddress
    },
    description: "StudentMezo DApp - Bitcoin-backed student loans via Mezo Protocol"
  };

  fs.writeFileSync(
    "deployment-addresses.json",
    JSON.stringify(deploymentData, null, 2)
  );
  console.log("💾 Deployment addresses saved to deployment-addresses.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
