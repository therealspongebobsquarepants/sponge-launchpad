import * as dotenv from "dotenv";
dotenv.config();
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import "@matterlabs/hardhat-zksync-solc";
import "@matterlabs/hardhat-zksync-verify";

// Load wallet
const fs = require('fs');
const path = require('path');
const secretsPath = path.join(process.env.HOME, '.clawd', 'secrets', 'wallet.json');
let deployerPrivateKey = "";
try {
    const secrets = JSON.parse(fs.readFileSync(secretsPath, 'utf8'));
    deployerPrivateKey = secrets.privateKey;
} catch (e) {
    console.log("⚠️ No wallet secret found. Using default/empty.");
}

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        // https://docs.soliditylang.org/en/v0.8.20/using-the-compiler.html#optimizer-options
        runs: 200,
      },
    },
  },
  defaultNetwork: "localhost",
  namedAccounts: {
    deployer: {
      // By default, it will take the first Hardhat account as the deployer
      default: 0,
    },
  },
  networks: {
    // View the networks that are pre-configured.
    // If the network you are looking for is not here you can add new network settings
    hardhat: {
      forking: {
        url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
        enabled: process.env.MAINNET_FORKING_ENABLED === "true",
      },
    },
    base: {
      url: "https://lb.drpc.org/ogrpc?network=base&dkey=At1uVyjCT0jUtCnVr98-aY6K2cNk9xIR8JY1vsZj1RAX",
      accounts: [deployerPrivateKey],
    },
  },
};

export default config;
