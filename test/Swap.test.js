const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { ethers } = require("hardhat");

describe("Swap", function () {
    let owner, userAddress, SwapContract, swapContract;
    const ROUTER_ADDRESS = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";

    beforeEach(async function () {
        SwapContract = await ethers.getContractFactory("Swap");
        [owner, userAddress] = await ethers.getSigners();

        swapContract = await SwapContract.deploy(ROUTER_ADDRESS);
        await swapContract.deployed();
    });

    it("Should swap ETH for USDT", async function () {
        const initialBalance = await owner.getBalance();

        await swapContract.connect(userAddress).swapETHForUSDT(ethers.utils.parseEther("1"), { value: "1000000000000000000" });
        const addressBalance = await ethers.provider.getBalance(swapContract.address)
        console.log(addressBalance);
        expect(addressBalance).to.equal(ethers.BigNumber.from(0));
        expect(await owner.getBalance()).to.be.above(initialBalance);
    })


    // it("Should swap ETH for USDT", async function () {
    //     [owner, userAddress] = await ethers.getSigners();
    //     console.log(owner);
    //     // console.log(userAddress);

    //     const Swap = await ethers.getContractFactory("Swap");

    //     const swap = await Swap.deploy(ROUTER_ADDRESS);
    //     await swap.deployed();

    //     await swap.swapETHforUSDT({ value: 1000000000000000000 });

    // })
});