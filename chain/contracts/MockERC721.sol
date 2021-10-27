// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

interface IERC1271 {
  function isValidSignature(bytes32 hash, bytes memory signature) external view returns (bytes4 magicValue);
}

contract MockERC721 is ERC721 {
  using Counters for Counters.Counter;

  /// @dev Value is equal to keccak256("Permit(address spender,uint256 tokenId,uint256 nonce,uint256 deadline)");
  bytes32 public constant PERMIT_TYPEHASH = 0x49ecf333e5b8c95c40fdafc95c1ad136e8914a8fb55e9dc8bb01eaa83a2df9ad;
  bytes32 private immutable nameHash;
  bytes32 private immutable versionHash;

  Counters.Counter private _tokenIds;
  mapping(uint256 => string) private _tokenURIs;
  mapping(uint256 => uint256) private _nonces;

  event TokenURI(uint256 indexed tokenId, string indexed tokenUri);

  constructor(string memory name, string memory symbol, string memory version) 
    ERC721(name, symbol) {
      nameHash = keccak256(bytes(name));
      versionHash = keccak256(bytes(version));
  }

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

  // permit stuff
  function nonce(uint256 tokenId) external view returns(uint256) {
    return _nonce(tokenId);
  }

  function DOMAIN_SEPARATOR() public view returns (bytes32) {
    return
      keccak256(
        abi.encode(
          // keccak256('EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)')
          0x8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f,
          nameHash,
          versionHash,
          _getChainId(),
          address(this)
        )
      );
  }

  function permit(
        address spender,
        uint256 tokenId,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external payable {
      require(block.timestamp <= deadline, 'Permit expired');

      bytes32 digest =
        keccak256(
          abi.encodePacked(
            '\x19\x01',
            DOMAIN_SEPARATOR(),
            keccak256(abi.encode(PERMIT_TYPEHASH, spender, tokenId, _nonce(tokenId), deadline))
          )
        );
      address owner = ownerOf(tokenId);
      require(spender != owner, 'ERC721Permit: approval to current owner');

      if (Address.isContract(owner)) {
        require(IERC1271(owner).isValidSignature(digest, abi.encodePacked(r, s, v)) == 0x1626ba7e, 'Unauthorized');
      } else {
        address recoveredAddress = ecrecover(digest, v, r, s);
        require(recoveredAddress != address(0), 'Invalid signature');
        require(recoveredAddress == owner, 'Unauthorized');
      }

      _approve(spender, tokenId);
    }

    function _transfer(address from, address to, uint256 tokenId) internal override {
      super._transfer(from, to, tokenId);
      if(from != address(0)) {
        _nonces[tokenId]++;
      }
    }

    function _getChainId() internal view returns(uint256 chainId) {
      assembly {
        chainId := chainid()
      }
    }

    function _nonce(uint256 tokenId) internal view returns(uint256) {
      return _nonces[tokenId];
    }
}