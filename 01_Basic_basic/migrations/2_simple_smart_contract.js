//truffle runs the migration files in numeric order => 1 is for truffle, 2 is for us


const SimpleSmartContract = artifacts.require("SimpleSmartContract");

module.exports = function(deployer) {
  deployer.deploy(SimpleSmartContract);
};
