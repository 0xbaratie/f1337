import env from "hardhat";

async function main() {
  // await env.run("verify:verify", {
  //   address: "0x15EBaAD8717A6B71116ffAF1E0FD4A3b4DE0F96C",
  //   constructorArguments: [],
  // });

  await env.run("verify:verify", {
    address: "0x4fE3FC701504Ac72BFF774e42E78fb349607de56",
    constructorArguments: ["0x15EBaAD8717A6B71116ffAF1E0FD4A3b4DE0F96C"],
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
