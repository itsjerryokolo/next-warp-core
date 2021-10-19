import { expect } from "chai";
import { ethers } from 'hardhat';
import { Contract, Wallet } from 'ethers';
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("Token contract",() => {
  const tokenSupply = 1000000;
  let owner: SignerWithAddress;
  let alice: SignerWithAddress;
  let bob: SignerWithAddress;

  let TokenArtifacts;
  let Token: Contract;

  beforeEach(async () => {
    [owner, alice, bob] = await ethers.getSigners();
    TokenArtifacts  = await ethers.getContractFactory("MockERC20");
    Token = await TokenArtifacts.deploy();

    await Token.mint(owner.address, ethers.utils.parseUnits(tokenSupply.toString()));
  });

  describe("Initial Mint", () => {
    it("Deployment should assign the total supply of tokens to the owner", async () =>  {
      const ownerBalance = await Token.balanceOf(owner.address);
  
      expect(await Token.totalSupply()).to.equal(ownerBalance);
    });
  
    it("Deployment create correct amount of tokens", async () =>  {
      const totalSupply = await Token.getTotalSupply();
      expect(ethers.utils.parseUnits(tokenSupply.toString())).to.equal(totalSupply);
    });
  })

  describe("Transactions", () => {
    it("Should transfer tokens between accounts", async () => {
      await Token.transfer(alice.address, 50);
  
      // Assert
      expect(await Token.balanceOf(alice.address)).to.equal(50);
  
      // Act
      await Token.connect(alice).transfer(bob.address, 50);
  
      // Assert
      expect(await Token.balanceOf(alice.address)).to.equal(0);
      expect(await Token.balanceOf(bob.address)).to.equal(50);
    })
  });
});