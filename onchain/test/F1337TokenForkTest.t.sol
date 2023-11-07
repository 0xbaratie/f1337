// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.20;

import "forge-std/Test.sol";
import "forge-std/console2.sol";

import {F1337Token} from "../contracts/token/F1337Token.sol";

contract F1337TokenForkTest is Test {
    using stdStorage for StdStorage;

    uint baseFork;

    function setUp() public {
        baseFork = vm.createFork("https://mainnet.base.org");
    }

    function test_getBlockHash() public {
        vm.selectFork(baseFork);

        uint startBlock = 6003480;
        uint blocknum;

        for (uint j = 0; j < 10; j++) {
            vm.rollFork(startBlock - (256 * j));

            for (uint i = 1; i < 257; i++) {
                blocknum = block.number - i;
                console2.log(blocknum, uint(blockhash(blocknum)) % 10000);
            }
        }
    }
}
