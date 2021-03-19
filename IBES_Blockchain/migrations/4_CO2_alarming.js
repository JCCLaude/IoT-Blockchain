const CO2_Alarming = artifacts.require("CO2_Alarming");

module.exports = function (deployer) {
  deployer.deploy(CO2_Alarming);
};