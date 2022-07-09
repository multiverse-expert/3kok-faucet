const { default: axios } = require("axios");
const { providers, Wallet, Contract } = require("ethers");
const { parseEther } = require("ethers/lib/utils");
const { filterData } = require("../data");
const { getABIConfig } = require("./abi");
const { getInitConfig } = require("./init");

const methods = {
  async faucet(userAddress) {
    const config = await getInitConfig();
    const rpcURL = filterData(config, "BITKUB_RPC_URL");
    const characterAddress = filterData(config, "CHARACTER_CONTRACT_ADDRESS");
    const characterABI = await getABIConfig(
      filterData(config, "NATIVE_CARD_CONTRACT_ABI")
    );

    const tokenAddress = filterData(config, "DRAGON_STONE_CONTRACT_ADDRESS");
    const tokenABI = await getABIConfig(
      filterData(config, "NATIVE_TOKEN_CONTRACT_ABI")
    );

    const provider = new providers.JsonRpcProvider(rpcURL);

    const wallet = new Wallet(process.env.AUTHORITY_PRIVATE_KEY, provider);

    const nftContract = new Contract(characterAddress, characterABI, wallet);
    const tokenContract = new Contract(tokenAddress, tokenABI, wallet);

    const nftTx = await nftContract.safeMint(
      userAddress,
      "QmfU3Vj9peqaGkPKJEgqU94B8pCVMhi3HhW1c1mhHwUZXH"
    );

    const _nftTx = await nftTx.wait(5);

    const tokenTx = await tokenContract.transfer(
      userAddress,
      parseEther("1000")
    );

    const _tokenTx = await tokenTx.wait(5);

    return { _nftTx, _tokenTx };
  },
};

module.exports = { ...methods };
