const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying DAIVerse contracts to BNB Chain...");

  // Get deployer
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // Deploy DAIV Token
  console.log("Deploying DAIV Token...");
  const DAIVToken = await ethers.getContractFactory("DAIVToken");
  const daivToken = await DAIVToken.deploy();
  await daivToken.deployed();
  console.log("DAIV Token deployed to:", daivToken.address);

  // Deploy Governance Token
  console.log("Deploying Governance Token...");
  const GovernanceToken = await ethers.getContractFactory("GovernanceToken");
  const governanceToken = await GovernanceToken.deploy();
  await governanceToken.deployed();
  console.log("Governance Token deployed to:", governanceToken.address);

  // Deploy Timelock Controller
  console.log("Deploying Timelock Controller...");
  const TimelockController = await ethers.getContractFactory("TimelockController");
  const timelock = await TimelockController.deploy(
    2 * 24 * 60 * 60, // 2 days delay
    [deployer.address], // proposers
    [deployer.address], // executors
    deployer.address // admin
  );
  await timelock.deployed();
  console.log("Timelock Controller deployed to:", timelock.address);

  // Deploy DAO Governor
  console.log("Deploying DAO Governor...");
  const DAOGovernor = await ethers.getContractFactory("DAOGovernor");
  const daoGovernor = await DAOGovernor.deploy(governanceToken.address, timelock.address);
  await daoGovernor.deployed();
  console.log("DAO Governor deployed to:", daoGovernor.address);

  // Deploy Dataset Registry
  console.log("Deploying Dataset Registry...");
  const DatasetRegistry = await ethers.getContractFactory("DatasetRegistry");
  const datasetRegistry = await DatasetRegistry.deploy(daivToken.address);
  await datasetRegistry.deployed();
  console.log("Dataset Registry deployed to:", datasetRegistry.address);

  // Setup permissions
  console.log("Setting up permissions...");
  
  // Add Dataset Registry as minter for DAIV Token
  await daivToken.addMinter(datasetRegistry.address);
  console.log("Added Dataset Registry as DAIV Token minter");

  // Transfer ownership of Dataset Registry to Timelock (DAO control)
  await datasetRegistry.transferOwnership(timelock.address);
  console.log("Transferred Dataset Registry ownership to Timelock");

  console.log("\n=== Deployment Summary ===");
  console.log("DAIV Token:", daivToken.address);
  console.log("Governance Token:", governanceToken.address);
  console.log("Timelock Controller:", timelock.address);
  console.log("DAO Governor:", daoGovernor.address);
  console.log("Dataset Registry:", datasetRegistry.address);
  console.log("Deployer:", deployer.address);

  // Save deployment addresses
  const fs = require('fs');
  const addresses = {
    daivToken: daivToken.address,
    governanceToken: governanceToken.address,
    timeLock: timelock.address,
    daoGovernor: daoGovernor.address,
    datasetRegistry: datasetRegistry.address,
    network: "bsc",
    deployer: deployer.address
  };
  
  fs.writeFileSync('deployed-contracts.json', JSON.stringify(addresses, null, 2));
  console.log("Contract addresses saved to deployed-contracts.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });