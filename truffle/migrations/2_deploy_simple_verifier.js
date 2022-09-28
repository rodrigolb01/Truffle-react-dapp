const SimpleVerifier = artifacts.require("SimpleVerifier");

module.exports = function (deployer) {
  deployer.deploy(SimpleVerifier);
};
