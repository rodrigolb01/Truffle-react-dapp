Writing contracts:

1# Write the Contract.sol

2# Create the migration file.js

3# Add to the increment script

4# truffle compile

5# truffle deploy/migrate --network <TestNetName>

Testing the contract:

1# truffle console --network <TestNetName>

2# SimpleVerifier.deployed().then((i) => contract = i)

3# contract.verify('0xaa05af77f274774b8bdc7b61d98bc40da523dc2821fdea555f4d6aa413199bcc', '0x1b', '0xc0f7b8fac0ecf53b4780a60338cdd350c10f15d0b0dcb955b0c2b4cf24ced00c', '0x61f50290fd1f9bc91c66d5b8486077b385819d8de8c38aae5da58c2fb34c86ac', '0x14C0c57D1524e3bF3B762Cb451d37Af0Cd61006f')
