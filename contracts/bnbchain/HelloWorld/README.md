Based on:

MetaCoin tutorial from Truffle docs https://www.trufflesuite.com/docs/truffle/quickstart
HelloWorld example contract from BNB Chain Tutorial docs https://github.com/bnb-chain/bnb-chain-tutorial/blob/main/01-%20Hello%20World%20Full%20Stack%20dApp%20on%20BSC/contracts/HelloWorld.sol

1. Install truffle (https://www.trufflesuite.com/docs/truffle/getting-started/installation)
   `npm install -g truffle`

2. Navigate to this directory (/contracts/bnbchain/HelloWorld)

3. Install dependencies
   `yarn`

4. Test contract
   `truffle test ./test/TestHelloWorld.js`

   **Possible issue:** "Something went wrong while attempting to connect to the network. Check your network configuration. If you get a Time out error, try connecting with another RPC URL."

   **Solution:** run `truffle develop` and make sure port matches the one in truffle-config.js under development and test networks

5. Run locally via `truffle develop`
   $ truffle develop

   ```
   migrate

   let instance = await HelloWorld.deployed();

   let initialGreeting = await instance.getGreeting();

   initialGreeting.toString() // Should print Hello, World

   instance.setGreeting("BNBChain");

   let greetingAfterSet = await instance.getGreeting();

   greetingAfterSet.toString() // Should print Hello, BNBChain
   ```

6. Create Polygon testnet account

   - Install MetaMask (https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en)
   - Add a custom network with the following params:
     Network Name: "BSC Testnet"
     RPC URL: https://data-seed-prebsc-2-s1.binance.org:8545
     Chain ID: 97
     Currency Symbol: BNB
     Block Explorer URL: https://testnet.bscscan.com

7. Fund your account from the BSC Testnet Faucet
   https://testnet.bnbchain.org/faucet-smart
   Enter your account address from MetaMask
   Select Give Me BNB, desired amount
   Make sure you dont abuse the faucet. You can request more than once in 24 hours.

8. Add a `.secret` file in this directory with your account's seed phrase or mnemonic (you should be required to write this down or store it securely when creating your account in MetaMask). In `truffle-config.js`, uncomment the three constant declarations at the top, along with the matic section of the networks section of the configuration object.

9. Deploy contract
   `truffle migrate --network bsc`

10. Interact via web3.js

    ```js
    const {ethers} = require('ethers');
    const fs = require('fs');
    const mnemonic = fs.readFileSync('.secret').toString().trim();
    const signer = new ethers.Wallet.fromMnemonic(mnemonic);
    const provider = new ethers.providers.JsonRpcProvider(
      'https://data-seed-prebsc-2-s1.binance.org:8545/',
    );
    const json = JSON.parse(
      fs.readFileSync('build/contracts/HelloWorld.json').toString(),
    );
    const contract = new ethers.Contract(
      json.networks['97'].address,
      json.abi,
      signer.connect(provider),
    );

    contract.getGreeting().then((val) => console.log(val.toString()));
    // should log Hello, World

    contract.setGreeting('BNBChain').then((receipt) => console.log(receipt));

    contract.getGreeting().then((val) => console.log(val.toString()));
    // should log Hello, BNBChain
    ```
