// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.20;

import "forge-std/Test.sol";
import "forge-std/console2.sol";

import {F1337Token} from "../contracts/token/F1337Token.sol";

contract F1337TokenTest is Test {
    using stdStorage for StdStorage;

    address alice = vm.addr(1);
    address bob = vm.addr(2);
    address carol = vm.addr(3);
    address david = vm.addr(4);
    F1337Token token;

    function setUp() public {
        vm.label(alice, "alice");
        vm.label(bob, "bob");
        vm.label(carol, "carol");
        vm.label(david, "david");

        token = new F1337Token();
        token.togglePaused();
    }

    function test_constructor_Success() public {
        assertEq(address(token.owner()), address(this));
    }

    function test_blockNumber() public {
        console2.log("block.number: %s", block.number);
        console2.log("lotteryNumber: ", token.getLotteryNumber());
        vm.roll(100);
        console2.log("block.number: %s", block.number);
        console2.log("lotteryNumber: ", token.getLotteryNumber());
    }

    function test_lotteryNumberByHash() public {
        bytes32 _blockHash = blockhash(block.number - 1);
        uint _lotteryNumber = uint(_blockHash) % 10000;
        // console2.log("_lotteryNumber: %s", _lotteryNumber);
        // console2.log("lotteryNumber: ", token.getLotteryNumber());
        assertEq(_lotteryNumber, token.getLotteryNumber());

        vm.roll(20000);
        _blockHash = blockhash(block.number - 1);
        _lotteryNumber = uint(_blockHash) % 10000;
        assertEq(_lotteryNumber, token.getLotteryNumber());
    }

    function test_mint() public {
        vm.roll(10);
        console2.log("lotteryNumber: ", token.getLotteryNumber());

        vm.prank(alice);
        uint lotteryNumber_ = token.mint();
        console2.log("_id: %s", lotteryNumber_);
        assertEq(token.balanceOf(address(alice), 0), 1);

        vm.roll(11);
        vm.prank(alice);
        uint lotteryNumber_2 = token.mint();
        console2.log("_id: %s", lotteryNumber_2);
        assertEq(token.balanceOf(address(alice), 0), 2);
    }

    function test_mintFazzing() public {
        uint cnt = 20000;

        for (uint i = 0; i < cnt; i++) {
            vm.roll(i + 1);
            vm.prank(alice);
            uint lotteryNumber_ = token.mint();
            // console2.log(lotteryNumber_);
            if (lotteryNumber_ == 1337) {
                console2.log("You are 1337!!", i);
                assertEq(token.balanceOf(address(alice), 1), 1);
                break;
            }
        }
    }

    function test_getLotteryNumbers() public {
        vm.roll(100);
        uint num = block.number - 9;
        console2.log("block.number: %s", num);

        for (uint i = 0; i < 8; i++) {
            uint num2 = token.lotteryNumber(block.number - i - 1);
            console2.log("block.number: %s", num2);
        }

        uint[10] memory lotteryNumbers = token.getLotteryNumbers();
        console2.log("lotteryNumbers.length: %s", lotteryNumbers.length);
        for (uint i = 0; i < lotteryNumbers.length; i++) {
            console2.log(lotteryNumbers[i]);
        }
    }
}
