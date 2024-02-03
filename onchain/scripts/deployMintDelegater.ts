import { ethers } from "hardhat";

async function main() {
  const MintDelegater = await ethers.deployContract(
    "MintDelegater",
    ["0x15EBaAD8717A6B71116ffAF1E0FD4A3b4DE0F96C"],
    {
      // gasLimit: 10500000,
      // gasPrice: 150000005,
    }
  );
  await MintDelegater.waitForDeployment();
  console.log(`deployed MintDelegater to ${MintDelegater.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
