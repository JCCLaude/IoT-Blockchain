## Description of the file
This is the file that send random values to an Ethereum Blockchain and register them there. 

Generating the values and entering them into the blockchain is executed with the command `node data_transmission.js´.  

There are some adjustable parameters in the Javascript file "data_transmission.js". 
These include the IP address and port of the blockchain access, the address of the receiver and sender, and the time interval at which measurements are taken. 
The time interval, i.e. how often the random values are generated, can be set, but it is recommended to choose interval times above 5 seconds.
