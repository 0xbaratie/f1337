import { ethers } from "hardhat";

async function main() {
  const R1337TokenUri = await ethers.deployContract("R1337TokenUri");
  await R1337TokenUri.waitForDeployment();
  console.log(`deployed R1337TokenUri to ${R1337TokenUri.target}`);

  const R1337Token = await ethers.deployContract(
    "R1337Token",
    [R1337TokenUri.target],
    {
      // gasLimit: 10500000,
      // gasPrice: 150000005,
    }
  );
  await R1337Token.waitForDeployment();
  console.log(`deployed R1337Token to ${R1337Token.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
