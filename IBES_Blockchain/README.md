# IBES Blockchain
## _Local Blockchain Application_

This is the blockchain part of IBES. This Prototype is intended to run locally and requires 

- [node] 
- [truffle]
- [Ganache]

## How to run
- Install the dependencies 
- Start the Ganache GUI
- When running for the first time navigate to the project folder and start a truffle console
```sh
cd IBES_Blockchain
truffle console
```
- In the appearing truffle console deploy the smart contracts to the local Ganache blockchain
```sh
migrate --reset
```
- if the contracts already have been deployed in the latest version, 
  no actions after the second step are required

## Smart Contracts

Right now there are 3 smart contracts included in the prototype. They all share a "submit" function to provide data to them. The submitted data is required in the following format:

```sh
(string timestamp, int measured_value, string geolocation)
```


[//]: # (These are reference links)

   [node]: <https://nodejs.org/en/>
   [truffle]: <https://www.trufflesuite.com/truffler>
   [Ganache]: <https://www.trufflesuite.com/ganache>
   

