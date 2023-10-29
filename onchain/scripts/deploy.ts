import { ethers } from "hardhat";

async function main() {
  const F1337Token = await ethers.deployContract("F1337Token", [], {
    // gasLimit: 10500000,
    gasPrice: 150000005,
  });
  await F1337Token.waitForDeployment();
  console.log(`deployed to ${F1337Token.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
