import env from "hardhat";

async function main() {
  await env.run("verify:verify", {
    address: "0xC0502d4198cC7472CE8E6133BFE369e71F0F5f15",
    constructorArguments: [],
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
