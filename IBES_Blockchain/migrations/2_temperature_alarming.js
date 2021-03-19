const Temperature_Alarming = artifacts.require("Temperature_Alarming");

module.exports = function (deployer) {
  deployer.deploy(Temperature_Alarming);
};
