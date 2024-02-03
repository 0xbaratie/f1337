// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.20;

import "forge-std/Test.sol";
import "forge-std/console2.sol";

import {F1337Token} from "../contracts/token/F1337Token.sol";
import {MintDelegater} from "../contracts/token/MintDelegater.sol";

contract MintDelegateTest is Test {
    using stdStorage for StdStorage;

    address alice = vm.addr(1);
    address bob = vm.addr(2);
    address carol = vm.addr(3);
    address david = vm.addr(4);
    F1337Token token;
    MintDelegater delegator;

    function setUp() public {
        vm.label(alice, "alice");
        vm.label(bob, "bob");
        vm.label(carol, "carol");
        vm.label(david, "david");

        token = new F1337Token();
        token.togglePaused();
        delegator = new MintDelegater(address(token));
    }

    function test_mint_Success() public {
        delegator.mint(address(alice));
    }
}
