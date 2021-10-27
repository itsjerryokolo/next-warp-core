// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";

contract MockERC20 is ERC20, ERC20Permit {
  constructor() ERC20("Testing Token", "TEST") ERC20Permit("TestingToken") {}

  function mint(address to, uint256 amount) public {
    _mint(to, amount);
  }

  function burn(address account, uint256 amount) public {
    _burn(account, amount);
  }
}