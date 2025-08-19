# DAIverse Smart Contract Deployment Guide - Remix IDE

## Prerequisites
1. Install MetaMask and connect to BNB Chain
2. Get BNB for gas fees
3. Have OpenZeppelin contracts available in Remix

## BNB Chain Networks
- **Testnet**: ChainID 97, RPC: https://data-seed-prebsc-1-s1.binance.org:8545/
- **Mainnet**: ChainID 56, RPC: https://bsc-dataseed1.binance.org/

## Deployment Order (CRITICAL - Follow this exact order)

### 1. Deploy DAIVToken.sol
- Constructor: No parameters needed
- Initial supply: 1 billion DAIV tokens minted to deployer
- Max supply: 10 billion tokens
- **Save the contract address**

### 2. Deploy GovernanceToken.sol  
- Constructor: No parameters needed
- Initial supply: 100 million gDAIV tokens minted to deployer
- **Save the contract address**

### 3. Deploy TimelockController (OpenZeppelin)
- minDelay: `172800` (2 days in seconds)
- proposers: `["YOUR_DEPLOYER_ADDRESS"]`
- executors: `["YOUR_DEPLOYER_ADDRESS"]`
- admin: `"YOUR_DEPLOYER_ADDRESS"`
- **Save the contract address**

### 4. Deploy DAOGovernor.sol
- _token: `GOVERNANCE_TOKEN_ADDRESS` (from step 2)
- _timelock: `TIMELOCK_CONTROLLER_ADDRESS` (from step 3)
- **Save the contract address**

### 5. Deploy DatasetRegistry.sol
- _daivToken: `DAIV_TOKEN_ADDRESS` (from step 1)
- **Save the contract address**

## Post-Deployment Setup

### Step 1: Setup DAIV Token Minter
Call `addMinter()` on DAIVToken with DatasetRegistry address:
```solidity
daivToken.addMinter(DATASET_REGISTRY_ADDRESS)
```

### Step 2: Transfer Dataset Registry Ownership
Call `transferOwnership()` on DatasetRegistry:
```solidity
datasetRegistry.transferOwnership(TIMELOCK_CONTROLLER_ADDRESS)
```

### Step 3: Setup Timelock Roles (Optional)
Grant proposer role to DAO Governor:
```solidity
timelock.grantRole(PROPOSER_ROLE, DAO_GOVERNOR_ADDRESS)
```

## Contract Verification
After deployment, verify contracts on BSCScan:
- Go to BSCScan contract page
- Click "Verify and Publish"
- Select Solidity version 0.8.19
- Enable optimization with 200 runs
- Upload flattened source code

## Important Notes
- Keep all contract addresses safe
- Test on BSC Testnet first
- Ensure you have enough BNB for gas
- Each deployment will cost ~0.01-0.05 BNB

## Contract Addresses Template
```
DAIV Token: 0x...
Governance Token: 0x...
Timelock Controller: 0x...
DAO Governor: 0x...
Dataset Registry: 0x...
```

## Remix Tips
1. Use "Injected Provider - MetaMask" environment
2. Set gas limit to 3,000,000 for complex contracts
3. Use latest Solidity compiler 0.8.19+
4. Import OpenZeppelin contracts via GitHub
5. Flatten contracts before verification