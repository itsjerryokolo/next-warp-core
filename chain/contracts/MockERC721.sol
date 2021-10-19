// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MockERC721 is ERC721 {
  using Counters for Counters.Counter;

  Counters.Counter private _tokenIds;
  mapping(uint256 => string) private _tokenURIs;

  event TokenURI(uint256 indexed tokenId, string indexed tokenUri);

  constructor() ERC721("Test NFT", "TEST") {}

  function mint(address to, uint256 tokenId) public {
    _safeMint(to, tokenId);
  }

  function mintWithAutoTokenId(address to) public {
    _tokenIds.increment();
    uint256 tokenId = _tokenIds.current();
    _safeMint(to, tokenId);
  }

  function mintWithUri(address to, uint256 tokenId, string memory tokenUri) public {
    _safeMint(to, tokenId);
    _setTokenURI(tokenId, tokenUri);
  }

  function mintWithUriAutoTokenId(address to, string memory tokenUri) public {
    _tokenIds.increment();
    uint256 tokenId = _tokenIds.current();
    _safeMint(to, tokenId);
    _setTokenURI(tokenId, tokenUri);
  }

  //TODO: Batch/Duplicate mint functions?

  function _setTokenURI(uint256 tokenId, string memory tokenUri) internal {
    _tokenURIs[tokenId] = tokenUri;
    emit TokenURI(tokenId, tokenUri);
  }
}