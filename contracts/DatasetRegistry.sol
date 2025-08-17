// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract DatasetRegistry is Ownable, ReentrancyGuard {
    IERC20 public daivToken;
    
    struct Dataset {
        string cid; // IPFS content identifier
        string hash; // Dataset hash for verification
        address contributor;
        uint256 size;
        string license;
        string[] tags;
        uint256 timestamp;
        bool approved;
        uint256 baseReward;
        uint256 totalRewards;
        uint256 downloadCount;
    }
    
    struct Stake {
        uint256 amount;
        uint256 timestamp;
    }
    
    mapping(uint256 => Dataset) public datasets;
    mapping(address => Stake) public stakes;
    mapping(address => uint256[]) public contributorDatasets;
    
    uint256 public datasetCounter;
    uint256 public constant MINIMUM_STAKE = 100 * 10**18; // 100 DAIV tokens
    uint256 public constant BASE_REWARD = 50 * 10**18; // 50 DAIV tokens
    
    event DatasetSubmitted(uint256 indexed datasetId, string cid, address indexed contributor);
    event DatasetApproved(uint256 indexed datasetId, uint256 reward);
    event DatasetRejected(uint256 indexed datasetId, string reason);
    event StakeDeposited(address indexed user, uint256 amount);
    event StakeSlashed(address indexed user, uint256 amount);
    event RewardDistributed(uint256 indexed datasetId, address indexed contributor, uint256 amount);
    
    constructor(address _daivToken) {
        daivToken = IERC20(_daivToken);
    }
    
    function depositStake(uint256 amount) external {
        require(amount >= MINIMUM_STAKE, "Insufficient stake amount");
        require(daivToken.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        
        stakes[msg.sender].amount += amount;
        stakes[msg.sender].timestamp = block.timestamp;
        
        emit StakeDeposited(msg.sender, amount);
    }
    
    function submitDataset(
        string memory _cid,
        string memory _hash,
        uint256 _size,
        string memory _license,
        string[] memory _tags
    ) external {
        require(stakes[msg.sender].amount >= MINIMUM_STAKE, "Must stake tokens first");
        require(bytes(_cid).length > 0, "CID cannot be empty");
        require(bytes(_hash).length > 0, "Hash cannot be empty");
        
        datasetCounter++;
        
        datasets[datasetCounter] = Dataset({
            cid: _cid,
            hash: _hash,
            contributor: msg.sender,
            size: _size,
            license: _license,
            tags: _tags,
            timestamp: block.timestamp,
            approved: false,
            baseReward: BASE_REWARD,
            totalRewards: 0,
            downloadCount: 0
        });
        
        contributorDatasets[msg.sender].push(datasetCounter);
        
        emit DatasetSubmitted(datasetCounter, _cid, msg.sender);
    }
    
    function approveDataset(uint256 datasetId) external onlyOwner {
        require(datasetId <= datasetCounter && datasetId > 0, "Invalid dataset ID");
        require(!datasets[datasetId].approved, "Dataset already approved");
        
        datasets[datasetId].approved = true;
        datasets[datasetId].totalRewards = BASE_REWARD;
        
        // Transfer reward to contributor
        require(daivToken.transfer(datasets[datasetId].contributor, BASE_REWARD), "Reward transfer failed");
        
        emit DatasetApproved(datasetId, BASE_REWARD);
        emit RewardDistributed(datasetId, datasets[datasetId].contributor, BASE_REWARD);
    }
    
    function rejectDataset(uint256 datasetId, string memory reason) external onlyOwner {
        require(datasetId <= datasetCounter && datasetId > 0, "Invalid dataset ID");
        require(!datasets[datasetId].approved, "Dataset already approved");
        
        // Slash contributor's stake
        address contributor = datasets[datasetId].contributor;
        uint256 slashAmount = stakes[contributor].amount / 2; // Slash 50% of stake
        
        if (slashAmount > 0) {
            stakes[contributor].amount -= slashAmount;
            emit StakeSlashed(contributor, slashAmount);
        }
        
        emit DatasetRejected(datasetId, reason);
    }
    
    function distributeRetroactiveReward(uint256 datasetId, uint256 amount) external onlyOwner {
        require(datasets[datasetId].approved, "Dataset not approved");
        require(amount > 0, "Amount must be greater than 0");
        
        address contributor = datasets[datasetId].contributor;
        datasets[datasetId].totalRewards += amount;
        
        require(daivToken.transfer(contributor, amount), "Reward transfer failed");
        
        emit RewardDistributed(datasetId, contributor, amount);
    }
    
    function recordDownload(uint256 datasetId) external {
        require(datasets[datasetId].approved, "Dataset not approved");
        datasets[datasetId].downloadCount++;
    }
    
    function getDataset(uint256 datasetId) external view returns (Dataset memory) {
        return datasets[datasetId];
    }
    
    function getContributorDatasets(address contributor) external view returns (uint256[] memory) {
        return contributorDatasets[contributor];
    }
    
    function withdrawStake(uint256 amount) external nonReentrant {
        require(stakes[msg.sender].amount >= amount, "Insufficient stake");
        require(block.timestamp >= stakes[msg.sender].timestamp + 30 days, "Stake locked for 30 days");
        
        stakes[msg.sender].amount -= amount;
        require(daivToken.transfer(msg.sender, amount), "Transfer failed");
    }
}