/// @title A title that should describe the contract/interface
/// @author The name of the author
/// @notice Explain to an end user what this does
/// @dev Explain to a developer any extra details SPDX-License-Identifier:MIT
pragma solidity ^0.8.9;


import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NftMarketplace is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    address payable owner;

    uint256 public  listPrice = 0.01 ether;

    struct ListedToken {
        uint256 tokenId;
        address payable owner;
        address payable seller;
        uint256 price;
        bool currentlyListed;
    }

    event TokenListedSuccess(
        uint256 indexed tokenId,
        address owner,
        address seller,
        uint256 price,
        bool currentlyListed
    );

    mapping(uint => ListedToken) private idToListedToken;

    constructor() ERC721("NftMarketplace", "NFM") {
        owner = payable(msg.sender);
    }



      function updateListPrice(uint256 _listPrice) public payable {
        require(owner == msg.sender, "Only owner can update listing price");
        listPrice = _listPrice;
    }

    function getListPrice() public view returns (uint256) {
        return listPrice;
    }

    function getLatestIdToListedToken() public view returns (ListedToken memory) {
        uint256 currentTokenId = _tokenIds.current();
        return idToListedToken[currentTokenId];
    }

    function getListedTokenForId(uint256 tokenId) public view returns (ListedToken memory) {
        return idToListedToken[tokenId];
    }

    function getCurrentToken() public view returns (uint256) {
        return _tokenIds.current();
    }


    function createToken(
        string memory tokenUri,
        uint256 price
    ) public payable returns (uint256) {
        uint256 newTokenId = _tokenIds.current();
        _tokenIds.increment();

        _safeMint(msg.sender, newTokenId);

        _setTokenURI(newTokenId, tokenUri);

        createListedToken(newTokenId, price);

        return newTokenId;
    }

    function createListedToken(uint256 tokenId, uint256 price) private {

               

        require(msg.value >= price,"msg.value price is not equal ");

        require(price > 0,"price should be grater thean zero");

        idToListedToken[tokenId] = ListedToken(
            tokenId,
            payable(address(this)),
            payable(msg.sender),
            price,
            true
        );

        emit TokenListedSuccess(
            tokenId,
            address(this),
            msg.sender,
            price,
            true
        );
    }

    function getAllNfts() public view returns (ListedToken[] memory) {
        uint256 nftCount = _tokenIds.current();
        ListedToken[] memory tokens = new ListedToken[](nftCount);

        for (uint i = 0; i < nftCount; i++) {
            tokens[i] = idToListedToken[i];
        }

        return tokens;
    }

    function getAllMyNfts() public view returns (ListedToken[] memory) {
        uint256 nftCount = _tokenIds.current();

        uint count = 0;
        for (uint i = 0; i < nftCount; i++) {
            if (idToListedToken[i].seller == msg.sender) {
                count++;
            }
        }

        ListedToken[] memory myNfts = new ListedToken[](count);

        for (uint i = 0; i < count; i++) {
            myNfts[i] = idToListedToken[i];
        }

        return myNfts;
    }

    function executeSale(uint256 _id) public payable {

        //  console.log("Seller Address Before Sale: ", idToListedToken[_id].seller);
        //   console.log("owner Address After Sale: ", idToListedToken[_id].owner);
        require(_id <= _tokenIds.current());
        uint price = idToListedToken[_id].price;
        require(msg.value >= price);

        address seller = idToListedToken[_id].seller;

        
        idToListedToken[_id].currentlyListed = false;

        _transfer(seller, msg.sender, _id);

        idToListedToken[_id].seller = payable(msg.sender); 
        //approve the marketplace to sell NFTs on your behalf
        approve(address(this), _id);

        //  console.log("owner Address After Sale: ", idToListedToken[_id].owner);
        // console.log("Seller Address After Sale: ", idToListedToken[_id].seller);
   
        (bool success, ) = address(seller).call{value: msg.value}("");
        require(success);

        (bool successed, ) = address(owner).call{value: listPrice}("");
        require(successed);
    }
}

