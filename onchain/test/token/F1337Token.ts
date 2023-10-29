import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/dist/src/signer-with-address";
import { F1337Token } from "../../typechain-types";

describe("F1337Token", function () {
  let owner: SignerWithAddress;
  let alice: SignerWithAddress;
  let f1337Token: F1337Token;

  before(async () => {
    [owner, alice] = await ethers.getSigners();

    const F1337Token = await ethers.getContractFactory("F1337Token");
    f1337Token = await F1337Token.deploy();
  });

  describe("Deployment", function () {
    it("mint", async () => {
      await f1337Token.mint();
      const balance = await f1337Token.balanceOf(owner.address, 1);

      expect(await lock.owner()).to.equal(owner.address);
    });
  });
});
