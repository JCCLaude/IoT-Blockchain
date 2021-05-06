## Setup for DHT11 sensor:

| Task                           | Command                                      |
|--------------------------------|:--------------------------------------------:|
| 1. Pyhton 3:                   | sudo apt install python3                     |
| 2. pip3:                       | sudo apt install python-pip                  |
| 3. Adafruit:                   | sudo pip3 install adafruit-circuitpython-dht |
| 4. DHT11 Library:              | sudo apt-get install libgpiod2               |
| 5. time:                       | sudo pip3 install time                       |
| 6. datetime:                   | sudo pip3 install datetime                   |
| 7. pymongo:                    | sudo pip3 install pymongo                    |

## Description of the files
These are the files that send __real values of a DHT11 sensor__ to an Ethereum Blockchain and register them there. The DHT11 sensor measures the temperature and humidity and using the Python script "measure_dht11_sensor.py" the values measured by the sensor are sent to the javascript file "data_transmission_dht11_sensor.js". The Javascript file "data_transmission_dht11_sensor.js" enters the measured values in the blockchain. The Python script "dht11_save_values.py" allows saving the measured values in a file. 

Capturing the values and entering them into the blockchain is executed with the command `node data_transmission_dht11_sensor.js`.

To save the captured values, the script "dht11_save_values" is executed with the command `python3 dht11_save_values`.

There are some adjustable parameters in the Javascript file "data_transmission_dht11_sensor.js". These include the blockchain parameters and the time interval at which measurements are taken. The time interval, i.e. how often the measured values are output, can also be set for the Python script. It is recommended for all intervals times over 5 seconds, so as not to overload the sensor.
