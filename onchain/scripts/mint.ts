import { ethers } from "hardhat";

async function main() {
  const token = await ethers.getContractAt(
    "F1337Token",
    "0x473bF1B585808F1C7eEF20288eD315C98A779e33"
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
