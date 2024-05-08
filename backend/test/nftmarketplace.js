const { expect } = require("chai");

describe("nftmarketplace", async () => {
 let nftMarketplace, deployer, owner, addr1, addr2, price;

 beforeEach(async () => {
    const NftMarketplace = await ethers.getContractFactory("NftMarketplace");
    console.log(" BEFORE DEPLOYMENT:",NftMarketplace);
    [deployer, addr1, addr2, owner] = await ethers.getSigners();
    nftMarketplace = await NftMarketplace.deploy();
    console.log(" AFTER DEPLOYMENT:",nftMarketplace);

    await nftMarketplace.waitForDeployment();

    price = ethers.parseEther("0.1"); // Adjusted to use parseEther for clarity

    // Mint the NFT to the owner's address
    await nftMarketplace.connect(owner).createToken("tokenUri", price, { value: price });
 });

 describe('name and symbol', () => {
    it("Should set name and symbol", async function () {
      expect(await nftMarketplace.name()).to.equal("NftMarketplace");
      expect(await nftMarketplace.symbol()).to.equal("NFM");
    });
 });

 describe('listing price and get listing price', () => {
    it("listing price", async () => {
      expect(await nftMarketplace.listPrice()).to.equal("10000000000000000");
      expect(await nftMarketplace.getListPrice()).to.equal("10000000000000000");
    });
 });

 describe('CREATE TOKEN', () => {
    it("listing price", async () => {
      const tokenId = await nftMarketplace.getCurrentToken();
      expect(tokenId).to.equal(1);
    });
 });

 describe('CHECK THE CREATE TOKEN', () => {
    it("listing price", async () => {
      const nft = await nftMarketplace.getListedTokenForId(0);
      expect(nft.tokenId).to.equal(0);
      expect(nft.seller).to.equal(owner.address);
      expect(nft.currentlyListed).to.equal(true);
      expect(nft.price).to.equal(price);
    });
 });
 describe('EXECUTE SALE', () => {
  it("CHECKING THE EXECUTE SALE", async () => {
      const tokenId = await nftMarketplace.getCurrentToken();
      const nft = await nftMarketplace.getListedTokenForId(0);

      expect(nft.seller).to.equal(owner.address);

      console.log("NFT SELLER",nft.seller);

      // Ensure that the owner is the one executing the sale
     

       console.log("OWNER",owner.address);
       console.log("ADDRESS 1",addr1.address);
       console.log("ADDRESS 2",addr1.address);
       console.log("DEPLOYER",deployer.address);
       console.log("NFT MARKETPLACE",nftMarketplace.target);
      // Execute the sale from the owner to addr2
     let transaction = await nftMarketplace.connect(addr1).executeSale(0, { value: price })
      await transaction.wait()
         

      const updatedNft = await nftMarketplace.getListedTokenForId(0);
      expect(updatedNft.seller).to.equal(addr1.address, "Seller should be updated to addr2");
      console.log("updated owner",updatedNft.owner);
  });
});


});




 // orignal code
//  describe('EXECUTE SALE', () => {
//     it("CHECKING THE EXECUTE SALE", async () => {
//       // Assuming the NFT is minted to the owner's address and then listed for sale
//       // The owner should be able to execute the sale to addr2
//       await nftMarketplace.connect(owner).executeSale(0, { value: price });

//       const nft = await nftMarketplace.getListedTokenForId(0);
//       expect(nft.seller).to.equal(addr2.address); // Check if the seller is updated correctly
//     });
//  });




























































// const { expect } = require("chai");


// describe("nftmarketplace",  async  () => {
//   let nftMarketplace, deployer, owner,NftMarketplace,addr1,price,addr2
//   // 
  
 

//     beforeEach( async () => {


//        NftMarketplace = await ethers.getContractFactory("NftMarketplace");
//        [deployer ,addr1,addr2, owner] = await ethers.getSigners();
//      nftMarketplace = await NftMarketplace.deploy();
//       price = ethers.parseUnits('0.1', 'ether')
//     await nftMarketplace.waitForDeployment();
   

//       let transaction = await nftMarketplace.connect(owner).createToken("tokenUri","10000000000000000", { value: price })
//       await transaction.wait()
//     })

//     describe('name and symbol ', () => { 
//       it("Should setname and symbol", async function () {
//         expect(await nftMarketplace.name()).to.equal("NftMarketplace");
//         expect(await nftMarketplace.symbol()).to.equal("NFM");
//         console.log("nft marketplace address",nftMarketplace.address);
//         console.log("owner address",owner.address);

        
//      })
    
//     })

//     describe('listing price and getlisting price ', () => { 
//       it("listing price", async() => {
//         expect(await nftMarketplace.listPrice()).to.equal("10000000000000000");
//         expect(await nftMarketplace.getListPrice()).to.equal("10000000000000000");
//       })
//      })

//      describe('CREATE TOKEN ', () => { 
//       it("listing price", async() => {
//         const tokenId = await nftMarketplace.getCurrentToken();
//            expect(tokenId).to.equal(1);
        
//            console.log("deployer address",deployer.address);
//       })
//      })

//      describe('CHECK THE CREATE TOKEN ', () => { 
//       it("listing price", async() => {
//         const nft = await nftMarketplace.getListedTokenForId(0);
//         console.log("NFT OWNER",nft.owner);
//            expect(nft.tokenId).to.equal(0);
//            expect(nft.seller).to.equal(owner.address);
//            expect(nft.currentlyListed).to.equal(true);
//            expect(nft.price).to.equal("10000000000000000");
//       })
//      })

//      describe('EXECUTE SALE', () => { 
      
//       beforeEach(async () => {
//         let transaction = await nftMarketplace.connect(addr2).executeSale(0,{ value: "10000000000000000" })
//          await transaction.wait()
//       })
//       it("CHECKING THE EXECUTE SALE",async() => {
//         const nft = await nftMarketplace.getListedTokenForId(0);
//         console.log("nft.seller",nft.seller);
//         console.log("OWNER ADDRESS",owner.address);
       
//       })

//       })
     
      
      

//   })



























































































































//PHIND

// describe("NftMarketplace", function () {
//   let NftMarketplace, nftMarketplace, owner, addr1, addr2;

//   beforeEach(async function () {
//     // Get the ContractFactory and Signers here.
//     NftMarketplace = await ethers.getContractFactory("NftMarketplace");
//     [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

//     // To deploy our contract, we just have to call NftMarketplace.deploy() and await
//     // for it to be deployed(), which happens once its transaction has been mined.
//     nftMarketplace = await NftMarketplace.deploy();
//     await nftMarketplace.waitForDeployment();
//   });

//   describe("Deployment", function () {
//     it("Should set the right name and symbol", async function () {
//       expect(await nftMarketplace.name()).to.equal("NftMarketplace");
//       expect(await nftMarketplace.symbol()).to.equal("NFM");
//     });
//   });

// });








































































//   describe("Deployment", function () {
//     it("Should set the right unlockTime", async function () {
//       const { lock, unlockTime } = await loadFixture(deployOneYearLockFixture);

//       expect(await lock.unlockTime()).to.equal(unlockTime);
//     });

//     it("Should set the right owner", async function () {
//       const { lock, owner } = await loadFixture(deployOneYearLockFixture);

//       expect(await lock.owner()).to.equal(owner.address);
//     });

//     it("Should receive and store the funds to lock", async function () {
//       const { lock, lockedAmount } = await loadFixture(
//         deployOneYearLockFixture
//       );

//       expect(await ethers.provider.getBalance(lock.target)).to.equal(
//         lockedAmount
//       );
//     });

//     it("Should fail if the unlockTime is not in the future", async function () {
//       // We don't use the fixture here because we want a different deployment
//       const latestTime = await time.latest();
//       const Lock = await ethers.getContractFactory("Lock");
//       await expect(Lock.deploy(latestTime, { value: 1 })).to.be.revertedWith(
//         "Unlock time should be in the future"
//       );
//     });
//   });

//   describe("Withdrawals", function () {
//     describe("Validations", function () {
//       it("Should revert with the right error if called too soon", async function () {
//         const { lock } = await loadFixture(deployOneYearLockFixture);

//         await expect(lock.withdraw()).to.be.revertedWith(
//           "You can't withdraw yet"
//         );
//       });

//       it("Should revert with the right error if called from another account", async function () {
//         const { lock, unlockTime, otherAccount } = await loadFixture(
//           deployOneYearLockFixture
//         );

//         // We can increase the time in Hardhat Network
//         await time.increaseTo(unlockTime);

//         // We use lock.connect() to send a transaction from another account
//         await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith(
//           "You aren't the owner"
//         );
//       });

//       it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
//         const { lock, unlockTime } = await loadFixture(
//           deployOneYearLockFixture
//         );

//         // Transactions are sent using the first signer by default
//         await time.increaseTo(unlockTime);

//         await expect(lock.withdraw()).not.to.be.reverted;
//       });
//     });

//     describe("Events", function () {
//       it("Should emit an event on withdrawals", async function () {
//         const { lock, unlockTime, lockedAmount } = await loadFixture(
//           deployOneYearLockFixture
//         );

//         await time.increaseTo(unlockTime);

//         await expect(lock.withdraw())
//           .to.emit(lock, "Withdrawal")
//           .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
//       });
//     });

//     describe("Transfers", function () {
//       it("Should transfer the funds to the owner", async function () {
//         const { lock, unlockTime, lockedAmount, owner } = await loadFixture(
//           deployOneYearLockFixture
//         );

//         await time.increaseTo(unlockTime);

//         await expect(lock.withdraw()).to.changeEtherBalances(
//           [owner, lock],
//           [lockedAmount, -lockedAmount]
//         );
//       });
//     });
//   });
// });
