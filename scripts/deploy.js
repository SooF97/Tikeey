const { ethers } = require("hardhat");
const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Contract deployer address : ", deployer.address);
  //Get the Voting smart contract object and deploy it
  const tikeey = await ethers.deployContract("Tikeey");
  console.log("Deploying...");
  await tikeey.waitForDeployment();
  console.log("Contract deployed successfully :", await tikeey.getAddress());

  //Pull the address and ABI out while you deploy, since that will be key in interacting with the smart contract later
  const data = {
    address: await tikeey.getAddress(),
    abi: tikeey.interface.format("json"),
  };

  //This writes the ABI and address to the Tikeey.json
  //This data is then used by frontend files to connect with the smart contract
  fs.writeFileSync("./app/Tikeey.json", JSON.stringify(data));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
