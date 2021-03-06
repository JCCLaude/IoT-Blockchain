setInterval(all,15000); //15s, for every hour input: 3600000

var cnt_blockchain_send_temp = 0;
var cnt_blockchain_send_air = 0;
var air_limit = 95;
var temp_limit = 50;

const Web3 = require("web3");

/*function for all*/
function all () {


        /*function to determine a value between realistic upper and
        lower limit value*/
        var CO2value = Math.round(Math.random() * (2000 - 200) + 200);
        var tempvalue = Math.round(Math.random() * (50 - 10) + 10);
        var airvalue = Math.round(Math.random() * (95 - 20) + 20);

var date = "";
var geo = "";

const { promisify } = require('util')
const sleep = promisify(setTimeout)
var buf="";


/*Starting a child process and running the Python script "measure_dht11_sensor.py"
to get the values of the DHT11 sensor. Values of the Python script are piped to stdout
and then used in this script.*/
function pycall() {
const { exec } = require('child_process');
const script = exec('python3 measure_dht11_sensor.py', (error, stdout, stderr) =>
{
  if (error) { console.error(`error: ${error.message}`); return;
  }
  if (stderr) { console.error(`stderr: ${stderr}`); return;
  }
  buf = `${stdout}`;
script.kill('SIGINT');
});
}

pycall();

sleep(3000).then(() => {
        try{
                buf = buf.toString();
                buf = buf.split("'");
                tempvalue = parseInt(buf[3]);
                airvalue = parseInt(buf[7]);
                date = buf[11];
                geo = buf[15];
        }
        catch(error){}
        if(tempvalue == 0 || tempvalue == "undefined") {tempvalue = 404};
        if(airvalue == 0 || airvalue == "undefined") {airvalue = 404};

const init = async () => {

  //connect to the local running blockchain (ganache)
  const web3 = new Web3("ws://192.168.178.33:7545");

  // get the contract information from the build folder
  const id = await web3.eth.net.getId();


  const accounts = await web3.eth.getAccounts();
  const deployedNetwork = 5777;
  const temperatureEvent = new web3.eth.Contract(
   [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "timestamp",
          "type": "string"
        },
        {
          "indexed": true,
          "internalType": "int8",
          "name": "measurement",
          "type": "int8"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "geolocation",
          "type": "string"
        },
        {
          "indexed": true,
          "internalType": "uint8",
          "name": "critical",
          "type": "uint8"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "alarmMessage",
          "type": "string"
        }
      ],
      "name": "StatusMessage",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "string",
          "name": "_timestamp",
          "type": "string"
        },
        {
          "internalType": "int8",
          "name": "_measurement",
          "type": "int8"
        },
        {
          "internalType": "string",
          "name": "_geolocation",
          "type": "string"
        }
      ],
      "name": "submit",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ], "0x823580575C42AAB1f4a4ecfaa638dDF9e300d6D3"

  );

  if(cnt_blockchain_send_temp >= 1 || tempvalue >= temp_limit) {
    cnt_blockchain_send_temp = 0; //so every two loops
    const receipt = await temperatureEvent.methods
      .submit(date, tempvalue, geo)
      .send({ from: accounts[0], gasLimit: "6721975" });
  }

  const humidityEvent = new web3.eth.Contract(
    [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "timestamp",
          "type": "string"
        },
        {
          "indexed": true,
          "internalType": "uint8",
          "name": "measurement",
          "type": "uint8"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "geolocation",
          "type": "string"
        },
        {
          "indexed": true,
          "internalType": "uint8",
          "name": "critical",
          "type": "uint8"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "alarmMessage",
          "type": "string"
        }
      ],
      "name": "StatusMessage",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "string",
          "name": "_timestamp",
          "type": "string"
        },
        {
          "internalType": "uint8",
          "name": "_measurement",
          "type": "uint8"
        },
        {
          "internalType": "string",
          "name": "_geolocation",
          "type": "string"
        }
      ],
      "name": "submit",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ], "0x4a821bD1642bbD442c94147C0cD97E5ef73Ec4E7"
  );

  if(cnt_blockchain_send_air >= 1 || airvalue >= air_limit) {
    cnt_blockchain_send_air = 0; //so every two loops

    const receipt1 = await humidityEvent.methods
      .submit(date, airvalue, geo)
      .send({ from: accounts[0], gasLimit: "6721975" });
    };
 }


cnt_blockchain_send_temp += 1;
cnt_blockchain_send_air += 1;

init();

});

}


