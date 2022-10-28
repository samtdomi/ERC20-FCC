const { getNamedAccounts, network, ethers } = require("hardhat")
const { verify } = require("../utils/verify")
const { developmentChains, INITIAL_SUPPLY } = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccount, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    // Constructor Arguments
    // getting initialSupply from helper-hardhat-config

    // Deploy Contract
    const ourToken = await deploy("OurToken", {
        from: deployer,
        args: [INITIAL_SUPPLY],
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    log(`ourToken deployed at ${ourToken.address}`)

    // verification on Etherscan
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await verify(ourToken.address, [INITIAL_SUPPLY])
    }
}

module.exports.tags[("all", "token")]
