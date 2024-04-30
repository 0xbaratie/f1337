import env from "hardhat";

async function main() {
  await env.run("verify:verify", {
    address: "0xbeB25f5939C798EEFbbDa8e652438d3F3182bf07",
    constructorArguments: [],
  });

  // await env.run("verify:verify", {
  //   address: "0xce691645FfAf7122a14B9b2431C2EeBB5Ed3fBfE",
  //   constructorArguments: ["0xE2DA1fF9189cac300B884Ad6845BB28808496767"],
  // });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
