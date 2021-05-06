## Installing the dependencies

| Task                           | Command                                      |
|--------------------------------|:--------------------------------------------:|
| 1. Pyhton 3:                   | sudo apt install python3                     |
| 2. pip3:                       | sudo apt install python-pip                  |
| 3. time:                       | sudo pip3 install time                       |
| 4. datetime:                   | sudo pip3 install datetime                   |
| 5. pymongo:                    | sudo pip3 install pymongo                    |


## Description of the file
This is the file that send __random__ values to an Ethereum Blockchain and register them there. This file is for development purposes only and works without a sensor.

Generating the values and entering them into the blockchain is executed with the command `node data_transmission.js`.  

There are some adjustable parameters in the Javascript file "data_transmission.js". 
These include the blockchain parameter and the time interval at which measurements are taken. 
The time interval, i.e. how often the random values are generated, can be set, but it is recommended to choose interval times above 5 seconds.
