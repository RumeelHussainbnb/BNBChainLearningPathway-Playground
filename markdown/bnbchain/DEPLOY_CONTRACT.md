Solidity is a high level language. It is partly designed after ECMAScript and therefore it is said to be **similar to JavaScript**. The similarity ends there because it gets compiled (not interpreted) and usually deployed on blockchains that understand the Ethereum Virtual Machine (EVM), like BNB Smart Chain ! When a smart contract is deployed, it becomes immutable. This has both benefits and drawbacks, which we will discuss below.

We can use [HardHat](https://hardhat.org) or [Truffle](https://trufflesuite.com) to ease development and deployment of our Solidity code. There are several existing guides for other EVM compatible networks available on Figment Learn (check out BNB Chain Starter Box for quick development on the BNB Smart Chain network). We will focus on using Truffle in this tutorial.

# Pre-requisite

- IDE of your choice (we used VS Code).
- A Metamask account with test BNB Tokens, details [here](https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain).
- Node v16.13.0
- NPM v8.1.0
- Truffle v5.5.19 (core: 5.5.19)

Run the following commands to get started:

```text
npm install -g truffle
cd contracts/bnbchain/HelloWorld
yarn
```

{% hint style="warning" %}
Also be sure to rename the file **`contracts/bnbchain/HelloWorld/.secret.example`** to **`.secret`** before continuing. This file is where we will store the secret recovery phrase used later in this step to deploy the smart contract. You will need to replace the text "your recovery phrase goes here" with your Metamask secret recovery phrase.
{% endhint %}

# 🌐 The HelloWorld Solidity contract

One of the most basic, non-trivial, types of smart contract is a **Hello World contract**.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HelloWorld {
    string public greet = "World";  //variable for storing name

    constructor(){
        greet = "World";
    }

    /** @dev Retrieve Message to Print
      * @return The Message to Print, Hello, Concatenated with the User Name
      */
    function getGreeting() public view returns(string memory){
        return concat("Hello, " , greet);
    }

        /** @dev Set the Name to Greet
        * @param  _name  user name
        * @return success Returns bool value (True or False) to indicate if save was successful or not
        */
    function setGreeting(string memory _name) public returns(bool success){
        require(bytes(_name).length > 0);
        greet= _name;
        return true;
    }

    /** @dev Set the Name to Greet
        * @param  _base  contains the base value " Hello, "
        * @param  _value contains the name to append to message to display
        * @return the concatenated string of _base+_value i.e. Hello, Name
        */
    function concat(string memory _base, string memory _value) internal pure returns (string memory) {
            bytes memory _baseBytes = bytes(_base);
            bytes memory _valueBytes = bytes(_value);

            string memory _tmpValue = new string(_baseBytes.length + _valueBytes.length);
            bytes memory _newValue = bytes(_tmpValue);

            uint i;
            uint j;

            for(i=0; i<_baseBytes.length; i++) {
                _newValue[j++] = _baseBytes[i];
            }

            for(i=0; i<_valueBytes.length; i++) {
                _newValue[j++] = _valueBytes[i];
            }

            return string(_newValue);
        }

}

```

The first line of a Solidity file should contain a comment which describes the type of license governing the source code. The `SPDX-License-Identifier` will most commonly be the MIT licence, although a comprehensive list can be found at [https://spdx.org/licenses/](https://spdx.org/licenses/). The Solidity compiler will issue a [warning](https://docs.soliditylang.org/en/v0.8.17/security-considerations.html#take-warnings-seriously) if this line is not present at compilation time.

The next line specifies the version of the Solidity compiler to be used when compiling this contract. Using [semantic versioning](https://semver.org/), it is possible to prevent a Solidity file from being compiled by incompatible versions - most often in the case of breaking changes between major versions. The most recent version of Solidity ocmpiler is \([`0.8.17`](https://docs.soliditylang.org/en/v0.8.17/installing-solidity.html) at the time of this writing\).

Next we define our contract name, `HelloWorld` - The contract name can be anything, but should be descriptive of the functionality. The naming convention for Solidity is that the filename should match the UpperCamelCase contract name, hence `HelloWorld.sol`.

The `constructor()` is called only once, when the contract is deployed. The constructor is the place to assign default values to any variables, and performs an initial configuration of the app state. We will set the initial value of the `greet` variable to `World`.

Next we declare a function signature for the `setGreeting()` function, which has a [visibility](https://docs.soliditylang.org/en/v0.8.17/contracts.html#visibility-and-getters) of public. `setGreeting` takes a single argument `_name`, an string memory \([string](https://docs.soliditylang.org/en/v0.8.17/types.html#string-literals-and-types)\). The function body consists of 3 lines. The first is a require statement, which means the value of the `_name` variable should not be undefined or null. In the second line, the value passed via `_name_` is assigned to the `greet` state variable. The third line, simply returns `true` if the body is executed successfully.

The `getGreeting()` function signature is slightly different, in that there is no argument being passed. It also has a visibility of public, is a [view](https://docs.soliditylang.org/en/v0.8.17/types.html?highlight=view#function-types) type of function, and specifies a return type of `string`. Its function body will simply return the string "Hello" concatenated with the current value of `greet`. Here, `concat` is a user defined function.

# 🔧 Test the smart contract

This test uses the Truffle-provided `Assert` contracts which is built in to Truffle and the development blockchain. It is also important that we import the Solidity file we want to test!

Because deployed bytecode is immutable, it is best to work with security and best practices in mind. Prevent accidentally deploying code with errors by always _testing prior to deployment_. We will test our HelloWorld contract with Truffle.

```solidity
var helloworld = artifacts.require('../contracts/bsc/HelloWorld');

contract('HelloWorld', function(accounts) {
  let instance;
  before(async () => {
    instance = await helloworld.deployed();
  });

  //Test to check if the default value is set to "hello, world"
  it('Default message should be hello, world',async () => {
    let message = await instance.getGreeting.call({from: accounts[0]});
    assert.equal(message, "Hello, World","Incorrect Default Value");
  });

  //Test to check if the setGreeting is working or not
  it('Should save name',async () => {
    let result = await instance.setGreeting.sendTransaction('BNBChain',{from: accounts[0]});
    let message = await instance.getGreeting.call({from: accounts[0]});
    assert.equal(message, "Hello, BNBChain","Value Could not be Set");
  });

  //Test to check if error is thrown on empty greet field
  it('Should throw error on empty greet',async () => {
    try{
      let result = await instance.setGreeting.sendTransaction('',{from: accounts[0]});
      assert.fail(true,false,"The function should throw error");
    }
    catch(err){
        assert.include(String(err),'revert','throws different error');
    }
  });
});
```

The first test will be run against a freshly deployed version of the HelloWorld code every time, which is why the initial test for `greet` should always equal to "Hello, World".

The second test sets the value of `greet` to `BNBChain` and then queries it from the blockchain in the same manner as the first test, asserting that it will be equal to `Hello, BNBChain`.

The third test, checks that an erro should be thrown if the value of `greet` is not set to be empty.

Simple functionality, simple tests!  
Before running the tests, we must ensure we are running a local blockchain with Truffle. Open a separate terminal window and run the command:

```text
truffle develop
```

With this local blockchain running, we can test the HelloWorld contract with the command:

```text
truffle test
```

This will compile the contract before deploying it to the Truffle development chain and performing the tests. You should see similar output in your terminal:

```text
Using network 'develop'.

Compiling your contracts...
===========================
> Compiling .\contracts\HelloWorld.sol
> Compiling .\contracts\Migrations.sol
> Artifacts written to C:\****\****\AppData\Local\Temp\test--11256-Wa5M1pMd8bSK
> Compiled successfully using:
   - solc: 0.8.17+commit.8df45f5f.Emscripten.clang


  Contract: HelloWorld
    √ Default message should be hello, world (75ms)
    √ Should save name (1179ms)
    √ Should throw error on empty name (3429ms)


  3 passing (5s)
```

{% hint style="warning" %}
If there is an error : `Error: Cannot find module '@truffle/hdwallet-provider'`. You need to install the dependencies in this sub-module with `yarn` as mentioned at the beginning of the tutorial.
{% endhint %}

# ⛓ Deploy the smart contract

{% hint style="tip" %}
Before we deploy, there is one last thing to prepare: Paste the private key of your funded BNB Smart Chain address into **`contracts/bnbchain/HelloWorld/.secret`** so that the deployment can be paid for with BNB tokens from that address. You can also use the secret recovery phrase \(also known as a mnemonic seed phrase\) of the active Metamask account, however this method is not recommended as it could potentially result in your seed phrase being leaked. The private key grants access to only one account, while the seed phrase grants access to all accounts derived from it.  
{% endhint %}

To access the private key of the account you funded with BNB earlier in the pathway, open Metamask and click on the three dots in the upper right portion of the window. Click on "Account details", and then click the "Export Private Key" button - You'll need to enter your MetaMask password to be able to view the private key. Check the image below for details if you're not sure what this should look like.

![How to get your private key from MetaMask](/export_pk.png)

You will also notice in `contracts/bnbchain/HelloWorld/truffle-config.js` that the configuration parameter for using a mnemonic with the `HDWalletProvider` has been commented out by default. Be sure to uncomment it if you intend to use your secret recovery phrase!

If using a secret recovery phrase (mnemonic) in `contracts/bnbchain/HelloWorld/.secret` it should look like this, all 12 words on a single line with no quotation marks :

```text
airport battle cargo daughter educate focus green honey immune jelly kick language
```

---

Compiling Solidity with Truffle is a straightforward process, just make sure that your preferred configuration is set in `truffle-config.js` \(paths, compilers, networks, etc.\) and then run the following command:

```text
truffle compile
```

Deploying Migrations with Truffle is quite similar to deploying, but provides more flexibility for custom workflows. A full explanation of migrations is beyond the scope of this tutorial, but please do read the Truffle [documentation](https://www.trufflesuite.com/docs/truffle/getting-started/running-migrations) on the subject. To deploy the HelloWorld contract to BNB Smart Chain, run this command :

```text
truffle migrate --network bsc
```

The flag `--network bsc` lets Truffle know which network we want to deploy our migrations to. The configuration for each network is set inside of `truffle-config.js`.

For the deployment to work, make sure there is a valid private key or secret recovery phrase inside of the `.secret` file, and that the account has some BNB tokens. If you have followed the tutorial steps so far, these conditions should be satisfied.

---

# 🧩 Using the Application Binary Interface (ABI):

[The Solidity Contract ABI Specification](https://docs.soliditylang.org/en/v0.8.17/abi-spec.html) explains that an ABI is a standard way to interact with contracts in the Ethereum ecosystem, both from outside the blockchain and for contract-to-contract interaction. Data is encoded according to its type, as described in the specification. The encoding is not self describing and thus requires a schema in order to decode.

The ABI is considered an "[artifact](https://trufflesuite.github.io/artifact-updates/background.html#what-are-artifacts)" in relation to a compiled Solidity contract. Most commonly, developers will interact with an ABI in JSON format. Read more about [what this means](https://docs.soliditylang.org/en/v0.8.17/abi-spec.html#json).

---

# ✅ Make sure it works

Once the contract is compiled and deployed, paste the contract address into the textinput on the right side of this page and click to **Check deployment**. This will execute the `getCode` method available to the provider to ensure that there is a deployed contract at the specified address.

---

# 🏁 Conclusion

Truffle is only one of several different ways to deploy smart contracts on BNB Smart Chain. It is also possible to use the Ethereum [Remix IDE](https://remix.ethereum.org), or another smart contract development tool called [HardHat](https://hardhat.org). Now that we have a deployed and functioning smart contract on BNB Smart Chain, let's interact with it!
