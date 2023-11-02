//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.3;

import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";

contract Swap {
    address private USDT = 0xdAC17F958D2ee523a2206206994597C13D831ec7;
    address private owner;
    IUniswapV2Router02 public uniswapRouter;

    constructor(address _router) {
        owner = msg.sender;
        uniswapRouter = IUniswapV2Router02(_router);
    }

    function swapETHForUSDT(uint amountIn) external payable {
        require(msg.value >= amountIn, "Not enough ETH");

        uint comission = amountIn / 100;
        uint amountToSwap = amountIn - comission;

        // uint amountOutMin,
        // address[] calldata path,
        // address to,
        // uint deadline
        uniswapRouter.swapExactETHForTokens{value: amountToSwap}(
            0,
            getPathForETHtoUSDT(),
            address(this),
            block.timestamp
        );

        //keep commision
        payable(owner).transfer(comission);
    }

    //[uniswap.eth, usdt]
    function getPathForETHtoUSDT() private view returns (address[] memory) {
        address[] memory path = new address[](2);
        path[0] = uniswapRouter.WETH();
        path[1] = USDT;

        return path;
    }
}
