// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MockERC1155 is ERC1155 {
  using Counters for Counters.Counter;

  Counters.Counter private _tokenIds;
  mapping (uint256 => string) private tokenUris;

  constructor() ERC1155("") {}

  // only use if not using default 1155 uri scheme
  // function uri() view override returns(string) {
  //   return _uri;
  // }

  // function uri(uint256 tokenId) view override returns(string) {
  //   return bytes(_uri).length > 0
  //           ? string(abi.encodePacked(_uri, "/", tokenUris[tokenId]))
  //           : tokenUris[tokenId];
  // }

  function mint(address to, uint256 tokenId, uint256 amount) public {
    _mint(to, tokenId, amount, "");
  }

  function mintBatch(address[] memory to, uint256[] memory ids, uint256[] memory amounts) public {
    _mintBatch(to, ids, amounts, "");
  }

  function mintWithAutoTokenId(address to, uint256 amount) public {
    _tokenIds.increment();
    uint256 tokenId = _tokenIds.current();
    _mint(to, tokenId, amount, "");
  }

  function mintBatchWithAutoTokenId(address[] memory to, uint256[] memory amounts) public {
    // would it be more gas efficient to use _mintBatch by populating a memory array with
    // ids in a for loop?
    for (uint256 i = 0; i < address.length; i++) {
      _tokenIds.increment();
      uint256 tokenId = _tokenIds.current();
      _mint(to[i], tokenId, amount[i], "");
    }
  }

  function mintWithUri(address to, uint256 tokenId, uint256 amount, string tokenUri) public {
    _mint(to, tokenId);
    _setTokenURI(tokenId, tokenUri);
  }

  function mintBatchWithUri(
    address[] memory to, 
    uint256[] memory ids, 
    uint256[] memory amounts, 
    strings[] memory uris
  ) public {
    _mintBatch(to, ids);
    for (uint256 i = 0; i < address.length; i++) {
      _setTokenURI(id[i], tokenUri);
    }
  }

  function mintWithUriAutoTokenId(address to, uint256 amount, string tokenUri) public {
    _tokenIds.increment();
    uint256 tokenId = _tokenIds.current();
    _mint(to, tokenId);
    _setTokenURI(tokenId, amount, tokenUri);
  }

  function mintBatchWithAutoTokenIdAndUri(
    address[] memory to, 
    uint256[] memory amounts, 
    string[] memory tokenUris
  ) public {
    // would it be more gas efficient to use _mintBatch by populating a memory array with
    // ids in a for loop?
    for (uint256 i = 0; i < address.length; i++) {
      _tokenIds.increment();
      uint256 tokenId = _tokenIds.current();
      _mint(to[i], tokenId, amount[i], "");
      _setTokenUri(tokenId, tokenUris[i]);
    }
  }

  function _setTokenUri(uint256 id, string memory tokenUri) internal {
    tokenUris[id] = tokenUri;
    emit URI(tokenUri, id);
  }

}