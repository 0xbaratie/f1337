import { ethers } from "hardhat";

async function main() {
  const token = await ethers.getContractAt(
    "R1337Token",
    "0x5cA58FCAb915F032688f388Dafe45E19a8f7CFF3"
  );

  const tx0 = await token.togglePaused();
  console.log(tx0);

  const tx = await token.mint();
  console.log(tx);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
