var helloworld = artifacts.require('../contracts/bsc/HelloWorld');

contract('HelloWorld', function (accounts) {
  let instance;
  before(async () => {
    instance = await helloworld.deployed();
  });

  //Test to check if the default value is set to "hello, world"
  it('Default message should be hello, world', async () => {
    let message = await instance.getGreeting.call({from: accounts[0]});
    assert.equal(message, 'Hello, World', 'Incorrect message.');
  });

  //Test to check if the setGreeting is working or not
  it('Should save name', async () => {
    let result = await instance.setGreeting.sendTransaction('BNBChain', {
      from: accounts[0],
    });
    let message = await instance.getGreeting.call({from: accounts[0]});
    assert.equal(message, 'Hello, BNBChain', 'Incorrect message.');
  });

  //Test to check if error is thrown on empty name field
  it('Should throw error on empty name', async () => {
    try {
      let result = await instance.setGreeting.sendTransaction('', {
        from: accounts[0],
      });
      assert.fail(true, false, 'The function should throw error');
    } catch (err) {
      assert.include(String(err), 'revert', 'throws different error');
    }
  });
});
