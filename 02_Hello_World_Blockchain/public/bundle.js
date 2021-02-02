var helloWorldABI = [
  {
    "constant": true,
    "inputs": [],
    "name": "hello",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "pure",
    "type": "function",
    "signature": "0x19ff1d21"
  }
];
var helloWorldAddress = '0xC8f718a3C094EF3cEA763bC44E14170e9bb8f909'; //from the truffle console
var web3 = new Web3('http://localhost:9545'); //link to the local Blockchain


var helloWorld = new web3.eth.Contract(helloWorldABI, helloWorldAddress);

document.addEventListener('DOMContentLoaded', () => {
  helloWorld.methods.hello().call()
  .then(result => {
    document.getElementById('hello').innerHTML = result;
  });
});
