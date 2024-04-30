// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.20;

import "forge-std/Test.sol";
import "forge-std/console2.sol";

import {R1337Token} from "../contracts/token/R1337Token.sol";
import {R1337TokenUri} from "../contracts/token/R1337TokenUri.sol";

contract R1337TokenTest is Test {
    using stdStorage for StdStorage;

    address alice = vm.addr(1);
    address bob = vm.addr(2);
    address carol = vm.addr(3);
    address david = vm.addr(4);
    R1337Token token;
    R1337TokenUri uri;

    function setUp() public {
        vm.label(alice, "alice");
        vm.label(bob, "bob");
        vm.label(carol, "carol");
        vm.label(david, "david");

        uri = new R1337TokenUri();
        token = new R1337Token(address(uri));
        token.togglePaused();
    }

    function test_uri() public {
        vm.prank(alice);
        token.mint();
        console2.log(token.uri(0));
    }

    function test_elite() public {
        vm.prank(alice);
        token.mint();
        vm.prank(bob);
        token.mint();
        vm.prank(carol);
        token.mint();
        vm.prank(david);
        token.mint();
        address[] memory elites = token.getAllElites();
        assertEq(elites.length, 4);
        assertEq(elites[0], alice);
        assertEq(elites[1], bob);
        assertEq(elites[2], carol);
        assertEq(elites[3], david);
    }
}
