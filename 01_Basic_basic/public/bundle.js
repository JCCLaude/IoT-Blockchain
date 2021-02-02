var contractABI = [];
var contractAddress = '0xC8f718a3C094EF3cEA763bC44E14170e9bb8f909';
var web3 = new Web3('http://localhost:9545');
var simpleSmartContract = new web3.eth.Contract(contractABI, contractAddress);

console.log(simpleSmartContract);

web3.eth.getAccounts()
.then(console.log);
