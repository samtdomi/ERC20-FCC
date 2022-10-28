const { assert, expect } = require("chai")
const { deployments, getNamedAccounts, ethers } = require("hardhat")
const { developmentChains, INITIAL_SUPPLY } = require("../helper-hardhat-config")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("OurToken Unit Test", function () {
          // multiplier is used to make reading the math easier becasue of the 18 decimal points
          const multiplier = 10 ** 18
          // global variables
          let deployer, ourToken, accounts, user1

          // beforeEach that deploys a new contract so each test has a fresh contract to work with
          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer
              accounts = await getNamedAccounts()
              user1 = accounts[1]

              await deployments.fixture(["all"])
              ourToken = await ethers.getContract("OurToken", deployer)
          })

          it("Was deployed", async function () {
              assert(ourToken.address)
          })

          describe("Constructor function", function () {
              it("should have the correct INITIAL_SUPPLY of token", async function () {
                  // Arrange
                  const totalSupply = await ourToken.totalSupply()
                  // Assert
                  assert.equal(totalSupply.toString(), INITIAL_SUPPLY.toString())
              })

              it("initializes token with the correct name and symbol", async function () {
                  // Arrange
                  const name = (await ourToken.name()).toString()
                  const symbol = (await ourToken.symbol()).toString()
                  // Assert
                  assert.equal(name, "OurToken")
                  assert.equal(symbol, "OT")
              })
          }) // end of Constructor tests

          describe("transfers", async function () {
              it("Should be able to transfer tokens successfully to an address", async function () {
                  // Arrange
                  const deployerBalance = await ourToken.balanceOf(deployer.address)
                  // Act
                  await ourToken.transfer(user1.address, deployerBalance)
                  const newUserBalance = await ourToken.balanceOf(user1.address)
                  // Assert
                  assert.equal(newUserBalance.toString(), INITIAL_SUPPLY.toString())
              })

              it("emits a transfer event, when a transfer occurs", async function () {
                  await expect(ourToken.transfer(user1.address, INITIAL_SUPPLY)).to.emit(
                      ourToken,
                      "Transfer"
                  )
              })
          }) // end of Transfer tests

          describe("allowances", () => {
              const amount = (20 * multiplier).toString()
              beforeEach(async function () {
                  const playerToken = await ethers.getContract("OurToken", user1)
              })

              it("should approve other address to spend token", async function () {
                  /* const tokenAmount = ethers.utils.parseEther("5")
                  await playerToken.approve(deployer, tokenAmount)
                  const allowanceAmount = await playerToken.allowance(user1, deployer)
                  assert.equal(allowanceAmount.toString(), tokenAmount.toString())
                  */
              })

              it("doesnt allow an unnaproved member to do transfers", async function () {})

              it("emits an approval event, when approval occurs", async function () {
                  const tokenAmount = ethers.utils.parseEther("5")
                  await expect(ourToken.approve(user1, tokenAmount)).to.emit(ourToken, "Approval")
              })

              it("the allowance being set is accurate", async function () {
                  const tokenAmount = ethers.utils.parseEther("5")
                  await ourToken.approve(user1, tokenAmount)
                  const user1AllowanceAmount = await ourToken.allowance(deployer, user1)
                  assert.equal(user1AllowanceAmount.toString(), tokenAmount.toString())
              })

              it("wont allow a user to go over the allowance", async function () {})
          }) // end of Allowance tests
      }) // end of OurToken Contract test's
