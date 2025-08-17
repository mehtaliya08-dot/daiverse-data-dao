// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DAIVToken is ERC20, ERC20Burnable, Ownable {
    uint256 public constant INITIAL_SUPPLY = 1000000000 * 10**18; // 1 billion tokens
    uint256 public constant MAX_SUPPLY = 10000000000 * 10**18; // 10 billion tokens max
    
    mapping(address => bool) public minters;
    
    event MinterAdded(address indexed minter);
    event MinterRemoved(address indexed minter);
    
    constructor() ERC20("DAIVerse Token", "DAIV") {
        _mint(msg.sender, INITIAL_SUPPLY);
    }
    
    function addMinter(address minter) external onlyOwner {
        minters[minter] = true;
        emit MinterAdded(minter);
    }
    
    function removeMinter(address minter) external onlyOwner {
        minters[minter] = false;
        emit MinterRemoved(minter);
    }
    
    function mint(address to, uint256 amount) external {
        require(minters[msg.sender] || msg.sender == owner(), "Not authorized to mint");
        require(totalSupply() + amount <= MAX_SUPPLY, "Would exceed max supply");
        _mint(to, amount);
    }
    
    function mintRewards(address[] memory recipients, uint256[] memory amounts) external {
        require(minters[msg.sender] || msg.sender == owner(), "Not authorized to mint");
        require(recipients.length == amounts.length, "Arrays length mismatch");
        
        uint256 totalAmount = 0;
        for (uint256 i = 0; i < amounts.length; i++) {
            totalAmount += amounts[i];
        }
        
        require(totalSupply() + totalAmount <= MAX_SUPPLY, "Would exceed max supply");
        
        for (uint256 i = 0; i < recipients.length; i++) {
            _mint(recipients[i], amounts[i]);
        }
    }
}