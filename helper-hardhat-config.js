const { ethers } = require("hardhat")

const networkConfig = {
    5: {
        name: "goerli",
        ethUsdPriceFeed: "0xD4a33860578De61DBAbDc88Fdb98FD742fA7028e",
    },
}
const developmentChains = ["hardhat", "localhost"]

const INITIAL_SUPPLY = 50e18

module.exports = {
    networkConfig,
    developmentChains,
    INITIAL_SUPPLY,
}
