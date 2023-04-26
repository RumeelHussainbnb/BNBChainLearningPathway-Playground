const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const mnemonic = fs.readFileSync('.secret').toString().trim();
//const privateKey = fs.readFileSync('.secret').toString().trim();

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more details on how to specify configuration options!
  compilers: {
    solc: {
      version: '^0.8.0',
      parser: 'solcjs', // Leverages solc-js purely for speedy parsing
      settings: {
        optimizer: {
          enabled: true,
          runs: 200, // Optimize for how many times you intend to run the code
        },
        evmVersion: 'istanbul', // Default: "istanbul"
      },
    },
  },
  networks: {
    development: {
      host: '127.0.0.1',
      port: 9545,
      network_id: '*',
    },
    test: {
      host: '127.0.0.1',
      port: 9545,
      network_id: '*',
    },
    bsc: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://data-seed-prebsc-2-s1.binance.org:8545`,
        ),
      network_id: 97,
      confirmations: 10,
      networkCheckTimeout: 100000,
      timeoutBlocks: 500,
      skipDryRun: true,
      pollingInterval: 30000,
    },
  },
};
