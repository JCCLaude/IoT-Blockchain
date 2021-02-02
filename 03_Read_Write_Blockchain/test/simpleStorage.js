const SimpleStorage = artifacts.require('SimpleStorage');

contract('SimpleStorage', () => {
  it('should set the value of data variable in smart contract', async () => {
    const simpleStorage = await SimpleStorage.deployed();
    await simpleStorage.set('Test123');
    const result = simpleStorage.get();
    assert(result, 'Test123');
  });
});
