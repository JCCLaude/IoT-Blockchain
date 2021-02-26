/* Script to send values of IoT sensors to Ethereum Blockchain in form of a $
block with the measured values of the IoT sensors encoded as a hex value for$
process, realistic random values are initially generated, which are to simul$
sensors first. These are then packed into a JSON string, which is encoded in$
blockchain in the form of a transaction. Also, temperature and humidity data$
using a Python script and sent to the blockchain. */

/*calling the all function*/
setInterval(all,3000);

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

/*Various values such as the IP address and the addresses of the sender and $
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


/*Starting a child process and running the Python script "measure_dht11_sens$
to get the values of the DHT11 sensor. Values of the Python script are piped$
and then used in this script.*/
function pycall() {
const { exec } = require('child_process');
const script = exec('python3 measure_dht11_sensor.py', (error, stdout, stder$
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
buf = buf.split(",");
tempstr = buf[0];
airstr = buf[1];
tempstr = tempstr.slice(tempstr.indexOf("=")+1,tempstr.indexOf("."));
airstr = airstr.slice(airstr.indexOf("=")+1,airstr.indexOf("."));
tempvalue = parseInt(tempstr);
airhumidityvalue = parseInt(airstr);
});

/*setting measured and random vaues in JSON format with associated classific$
sleep(10).then(() => {
if(tempvalue == 0 || tempvalue == "undefined") {tempvalue = "No Data"}
if(airhumidityvalue == 0 || airhumidityvalue == "undefined") {airhumidityval$
jsontext = JSON.stringify({ Carbon_Dioxide: CO2value, Temperatur:
tempvalue, Air_Humidity: airhumidityvalue, Nitrogen_Dioxide: NOxvalue,
Sulfur_Dioxide: SO2value, Oxygen: oxygenvalue});

/*function for encoding in hex format by stepping through the chars of the s$
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
sleep(10).then(() => {
const { exec } = require('child_process');
const sendT = exec('curl -X POST -H "Content-Type: application/json" --data $
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
