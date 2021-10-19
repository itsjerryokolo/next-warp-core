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
    require(to.length == ids.length &&
      ids.length == amounts.length,
      "mint:array length mismatch"
    );
    for (uint256 i = 0; i < to.length; i++) {
      _mint(to[i], ids[i], amounts[i], "");
    }
  }

  function mintWithAutoTokenId(address to, uint256 amount) public {
    _tokenIds.increment();
    uint256 tokenId = _tokenIds.current();
    _mint(to, tokenId, amount, "");
  }

  function mintBatchWithAutoTokenId(address[] memory to, uint256[] memory amounts) public {
    // would it be more gas efficient to use _mintBatch by populating a memory array with
    // ids in a for loop?
    for (uint256 i = 0; i < to.length; i++) {
      _tokenIds.increment();
      uint256 tokenId = _tokenIds.current();
      _mint(to[i], tokenId, amounts[i], "");
    }
  }

  function mintWithUri(address to, uint256 tokenId, uint256 amount, string memory tokenUri) public {
    _mint(to, tokenId, amount, "");
    _setTokenURI(tokenId, tokenUri);
  }

  function mintBatchWithUri(
    address[] memory to, 
    uint256[] memory ids, 
    uint256[] memory amounts, 
    string[] memory uris
  ) public {
    require(to.length == ids.length &&
      ids.length == amounts.length &&
      amounts.length == uris.length,
      "mint:array length mismatch"
    );
    for (uint256 i = 0; i < to.length; i++) {
      _mint(to[i], ids[i], amounts[i], "");
      _setTokenURI(ids[i], uris[i]);
    }
  }

  function mintWithUriAutoTokenId(address to, uint256 amount, string memory tokenUri) public {
    _tokenIds.increment();
    uint256 tokenId = _tokenIds.current();
    _mint(to, tokenId, amount, "");
    _setTokenURI(tokenId, tokenUri);
  }

  function mintBatchWithAutoTokenIdAndUri(
    address[] memory to, 
    uint256[] memory amounts, 
    string[] memory _tokenUris
  ) public {
    // would it be more gas efficient to use _mintBatch by populating a memory array with
    // ids in a for loop?
    for (uint256 i = 0; i < to.length; i++) {
      _tokenIds.increment();
      uint256 tokenId = _tokenIds.current();
      _mint(to[i], tokenId, amounts[i], "");
      _setTokenURI(tokenId, _tokenUris[i]);
    }
  }

  function _setTokenURI(uint256 id, string memory tokenUri) internal {
    tokenUris[id] = tokenUri;
    emit URI(tokenUri, id);
  }

}