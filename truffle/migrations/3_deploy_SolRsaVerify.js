const SolRsaVerify = artifacts.require("SolRsaVerify");

module.exports = function (deployer) {
  deployer.deploy(SolRsaVerify);
};
