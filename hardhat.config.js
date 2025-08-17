require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    bsc: {
      url: "https://bsc-dataseed1.binance.org/",
      chainId: 56,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
    },
    bscTestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      chainId: 97,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
    }
  },
  etherscan: {
    apiKey: {
      bsc: process.env.BSCSCAN_API_KEY,
      bscTestnet: process.env.BSCSCAN_API_KEY
    }
  }
};