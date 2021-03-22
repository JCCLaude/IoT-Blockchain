const Humidity_Alarming = artifacts.require("Humidity_Alarming");

module.exports = function (deployer) {
  deployer.deploy(Humidity_Alarming);
};
