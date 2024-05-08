// // We require the Hardhat Runtime Environment explicitly here. This is optional
// // but useful for running the script in a standalone fashion through `node <script>`.
// //
// // You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// // will compile your contracts, add the Hardhat Runtime Environment's members to the
// // global scope, and execute the script.
// const hre = require("hardhat");
// const fs = require('fs')

// async function main() {
  

  

//   const nftMarketplace = await hre.ethers.deployContract("NftMarketplace");

//   await nftMarketplace.waitForDeployment();

//   console.log(`NftMarketplace deployed to ${nftMarketplace.address}`
//   );
//   const data = {
//     address: nftMarketplace.address,
//     abi: JSON.parse(nftMarketplace.interface.format('json'))
//   }

//   //This writes the ABI and address to the mktplace.json
//   fs.writeFileSync('./src/NftMarketplace.json', JSON.stringify(data))
// }

// // We recommend this pattern to be able to use async/await everywhere
// // and properly handle errors.
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });



// const hre = require("hardhat");
// const fs = require('fs');

// async function main() {
//  const NftMarketplaceFactory = await hre.ethers.getContractFactory("NftMarketplace");
//  const nftMarketplace = await NftMarketplaceFactory.deploy();
//  await nftMarketplace.waitForDeployment();

//  console.log(`NftMarketplace deployed to ${nftMarketplace.address}`);

//  const data = {
//     address: nftMarketplace.address,
//     abi: nftMarketplace.interface.format('json')
//  };

//  // This writes the ABI and address to the mktplace.json

// }

// main().catch((error) => {
//  console.error(error);
//  process.exitCode = 1;
// });





// const { ethers } = require("hardhat");
// const hre = require("hardhat");
// const fs = require("fs");

// async function main() {
//   const [deployer] = await ethers.getSigners();
  
//   const NftMarketplace = await hre.ethers.getContractFactory("NftMarketplace");
//   const nftMarketplace = await NftMarketplace.deploy();

//   await nftMarketplace.waitForDeployment();
  

//   const data = {
//     address: nftMarketplace.address,
   
//   }
//   console.log(`NftMarketplace deployed to ${nftMarketplace.address}`);
//   //This writes the ABI and address to the mktplace.json
 
// }

// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });



// const hre = require("hardhat");
// const fs = require('fs');

// async function main() {
//  const NftMarketplaceFactory = await hre.ethers.getContractFactory("NftMarketplace");
//  const nftMarketplace = await NftMarketplaceFactory.deploy();
//  await nftMarketplace.waitForDeployment();

//  console.log(`NftMarketplace deployed to ${nftMarketplace.target}`);

 
// }

// main().catch((error) => {
//  console.error(error);
//  process.exitCode = 1;
// });


const { ethers } = require("hardhat");
const hre = require("hardhat");
const fs = require("fs");

async function main() {
  
  
  const Marketplace = await hre.ethers.getContractFactory("NftMarketplace");
  const marketplace = await Marketplace.deploy();

  await marketplace.waitForDeployment();


  const data = {
    address: marketplace.target,
    abi: marketplace.interface.format('json')
  }
  console.log("data addrss", data.address);

  //This writes the ABI and address to the mktplace.json
  fs.writeFileSync('../frontend/src/Marketplace.json', JSON.stringify(data));

  console.log("marketplace address",marketplace.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });