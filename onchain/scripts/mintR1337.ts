import { ethers } from "hardhat";

async function main() {
  const token = await ethers.getContractAt(
    "R1337Token",
    "0x7793A1872Ac1E417fbF5d191281215C7434430C0"
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
