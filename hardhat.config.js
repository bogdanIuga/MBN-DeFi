require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.7.3",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      forking: {
        url: "https://eth-mainnet.g.alchemy.com/v2/76cxfBTZ88cn_EVR2rAqw4c7iBTj-O6p",
        blockNumber: 17238696
      }
    }
  }
}