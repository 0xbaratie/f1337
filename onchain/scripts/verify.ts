import env from "hardhat";

async function main() {
  // await env.run("verify:verify", {
  //   address: "0x15EBaAD8717A6B71116ffAF1E0FD4A3b4DE0F96C",
  //   constructorArguments: [],
  // });

  await env.run("verify:verify", {
    address: "0xA321c4DE2A1aCCD8CBe78bC79E9623F8E18A2837",
    constructorArguments: ["0x15EBaAD8717A6B71116ffAF1E0FD4A3b4DE0F96C"],
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
