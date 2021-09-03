// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MockERC721 is ERC20 {
  using Counters for Counters.Counter;

  Counters.Counter private _tokenIds;

  constructor() ERC721("Test NFT", "TEST") {}

  function mint(address to, uint256 tokenId) public {
    safeMint(to, tokenId);
  }

  function mintWithAutoTokenId(address to) public {
    _tokenIds.increment();
    uint256 tokenId = _tokenIds.current();
    safeMint(to, tokenId);
  }

  function mintWithUri(address to, uint256 tokenId, string tokenUri) public {
    safeMint(to, tokenId);
    _setTokenURI(tokenId, tokenUri);
  }

  function mintWithUriAutoTokenId(address to, string tokenUri) public {
    _tokenIds.increment();
    uint256 tokenId = _tokenIds.current();
    safeMint(to, tokenId);
    _setTokenURI(tokenId, tokenUri);
  }
}