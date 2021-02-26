/* Script to send values of IoT sensors to Ethereum Blockchain in form of a transaction. This creates a new
block with the measured values of the IoT sensors encoded as a hex value for everyone to see. In this
process, realistic random values are initially generated, which are to simulate the measured data of the IoT
sensors first. These are then packed into a JSON string, which is encoded in hex format and then sent to the
blockchain in the form of a transaction. Also, temperature and humidity data is collected from a DHT11 sensor
using a Python script and sent to the blockchain. */

/*calling the all function.
Option to set the time in which the values are sent to the blockchain at intervals. 
Time in milliseconds and over 5000 miliseconds recommended*/
setInterval(all,5000);

/*function for all*/
function all () {

        /*function to determine a value between realistic upper and
        lower limit value*/
        var CO2value = Math.round(Math.random() * (2000 - 200) + 200);
        var tempvalue = Math.round(Math.random() * (50 - 10) + 10);
        var airhumidityvalue = Math.round(Math.random() * (95 - 20) + 20);
        var NOxvalue = Math.round(Math.random() * (250 - 40) + 40);
        var SO2value = Math.round(Math.random() * (400 - 40) + 40);
        var oxygenvalue = Math.round(Math.random() * (25 - 10) + 10);

/*Various values such as the IP address and the addresses of the sender and and receiver can
be entered here to configure the sensor.*/
var from_adr = "\"" + "0x24C143d7B4761c7b4860447C7d5f46E1Df5Fdf1e" + "\"";
var to_adr = "\"" + "0x636Eb4246AeA21f04215e349e7d8c3E868bEE03C" + "\"";
var ip_adr_port_blockchain = "http://192.168.178.33:9545";

var jsontext;
var jsonhex;

tempvalue = 0;
airhumidityvalue = 0;

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

pycall()

sleep(2000).then(() => {
buf = buf.toString();
try{buf = buf.split(",");} catch(err) {}
tempstr = buf[0];
airstr = buf[1];
tempstr = tempstr.slice(tempstr.indexOf("=")+1,tempstr.indexOf("."));
airstr = airstr.slice(airstr.indexOf("=")+1,airstr.indexOf("."));
tempvalue = parseInt(tempstr);
airhumidityvalue = parseInt(airstr);
});

/*setting measured and random vaues in JSON format with associated classification*/
sleep(2100).then(() => {
if(tempvalue == 0 || tempvalue == "undefined") {tempvalue = "No Data"}
if(airhumidityvalue == 0 || airhumidityvalue == "undefined") {airhumidityvalue = "No Data"}
jsontext = JSON.stringify({ Carbon_Dioxide: CO2value, Temperatur:
tempvalue, Air_Humidity: airhumidityvalue, Nitrogen_Dioxide: NOxvalue,
Sulfur_Dioxide: SO2value, Oxygen: oxygenvalue});

/*function for encoding in hex format by stepping through the chars of the string*/
String.prototype.hexEncode = function(){ var hex, i; var result = "";
for(i=0; i<this.length; i++){
        hex = this.charCodeAt(i).toString(16);
        result += ("000"+hex).slice(-4);
        }
return result;
}

jsonhex = jsontext.hexEncode();
jsonhex = "\"0x"+jsonhex+"\"";
})

/*creating a child process and executing the send transaction command in it*/
sleep(2200).then(() => {
const { exec } = require('child_process');
const sendT = exec('curl -X POST -H "Content-Type: application/json" --data \'{"jsonrpc":"2.0", "method":"eth_sendTransaction", "params":[{"from": ' + from_adr + ', "to": ' + to_adr+ ', "gas": "0x76c0", "gasPrice": "0x4A817C800", "value": "0x9184e72a", "data": ' + jsonhex +'}],"id":1}\' ' + ip_adr_port_blockchain + '', (error, stdout, stderr) =>
{
  if (error) { console.error(`error: ${error.message}`); return;
  }
  if (stderr) { console.error(`stderr: ${stderr}`); return;
  }

sleep(100).then(() => {
sendT.kill('SIGINT');
});

});
})

}
