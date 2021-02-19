/*
Script to send values of IoT sensors to Ethereum Blockchain
in form of a transaction. This creates a new block with the
measured values of the IoT sensors encoded as a hex value
for everyone to see.

In this process, realistic random values are initially
generated, which are to simulate the measured data of
the IoT sensors first. These are then packed into a JSON
string, which is encoded in hex format and then sent to
the blockchain in the form of a transaction.
*/


	/*function to determine a value between realistic upper
	and lower limit value*/
	var CO2value = Math.round(Math.random() * (2000 - 200) + 200);
	var tempvalue = Math.round(Math.random() * (50 - 10) + 10);
	var airhumidityvalue = Math.round(Math.random() * (95 - 20) + 20);
	var NOxvalue = Math.round(Math.random() * (250 - 40) + 40);
	var SO2value = Math.round(Math.random() * (400 - 40) + 40);
	var oxygenvalue = Math.round(Math.random() * (25 - 10) + 10);


/*setting random vaues in JSON format with associated classification*/
var jsontext = JSON.stringify({
Carbon_Dioxide: CO2value, Temperatur: tempvalue, Air_Humidity: airhumidityvalue,
Nitrogen_Dioxide: NOxvalue, Sulfur_Dioxide: SO2value, Oxygen: oxygenvalue});



/*function for encoding in hex format by stepping through the chars of the string*/
String.prototype.hexEncode = function(){
var hex, i;

var result = "";
for(i=0; i<this.length; i++){
	hex = this.charCodeAt(i).toString(16);
	result += ("000"+hex).slice(-4);
	}
return result;
}

var jsonhex = jsontext.hexEncode();



/*creating a child process and execute the send transaction command in it*/
const { exec } = require('child_process');

exec('curl -X POST -H "Content-Type: application/json" --data \'{"jsonrpc":"2.0", "method":"eth_sendTransaction", "params":[{"from": "0x24C143d7B4761c7b4860447C7d5f46E1Df5Fdf1e", "to": "0x636Eb4246AeA21f04215e349e7d8c3E868bEE03C", "gas": "0x76c0", "gasPrice": "0x4A817C800", "value": "0x9184e72a", "data": "0x' + jsonhex +'"}],"id":1}\' http://192.168.178.33:9545', (error, stdout, stderr) => {
  if (error) {
    console.error(`error: ${error.message}`);
    return;
  }

  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }

  console.log(`stdout:\n${stdout}`);
});
