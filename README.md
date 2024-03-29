# I B E S 
## IoT Blockchain Emission System
System to let IoT devices write sensor data to a distributed ledger

## Setting up the blockchain:
_Dependencies Installation: Windows_

| Task                           | Command                                |
|--------------------------------|:--------------------------------------:|
| 1. chocolatey packet manager:  | https://chocolatey.org/install         |
| 2. nodejs:                     | choco install nodejs.install           |
| 3. web3:                       | npm install web3                       |
| 4. (optional) git:             | choco installl git.install             |
| 5. ganache:                    | https://www.trufflesuite.com/ganache   |
| 6. truffle framework:          | npm install -g truffle                 |


## Setting up the Basic Ethereum client:
_Dependencies Installation: Linux, Raspbian_

| Task                     | Command                                                         |
|--------------------------|:---------------------------------------------------------------:|
| 1. install golang:       |     Link: https://golang.org/dl/ (v1.13.8) <br>=> wget https://dl.google.com/go/go1.13.8.linux-armv6l.tar.gz  (<= for raspbian, for linux vm => linux-amd64) |
| 2. Extracting:           |       sudo tar -C /usr/local -xvf go1.13.8.linux-armv6l.tar.gz |
| 3. Permissions:          |       sudo chown root:root /usr/local/go |
| 4. Permissions:          |       sudo chmod 755 /usr/local/go |
| 5. Environment variable: |       sudo vi /etc/profile   <br>=> (write in last line)    export PATH=$PATH:/usr/local/go/bin |
| 6. Reboot                |       sudo reboot |
| 7. install geth:         |       https://github.com/ethereum/go-ethereum/ (v1.9.25) <br>=> git clone https://github.com/ethereum/go-ethereum.git --branch v1.9.25 |
| 8. Setting geth up:      |       cd go-ethereum      <br>=>    make geth (wait a couple of minutes)    <br>=> sudo mv ~/go-ethereum/build/bin/geth /usr/local/bin |
| 9. Testing:              |       go version          <br>=> geth version |
| 10. Running script:      |       node data_transmission.js |


## Webserver:
_Plattform Visual Studio Code:_ https://code.visualstudio.com/download 

| Task                             | Command                                                                            |
|----------------------------------|:----------------------------------------------------------------------------------:|
| 1. Backend                       |                                                                                    |
| 1.1. install express:            | npm install express (^4.17.1)                                                      |
| 1.2. install dotenv:             | npm install dotenv (^8.2.0)                                                        |
| 1.3. install mongoose:           | npm install mongoose (^5.12.1)                                                     |
| 1.4. install cors:               | npm install cors (^2.8.5)                                                          |
| 1.5. install nodemon: (optional) | npm install -g nodemon (^2.0.7)                                                    |
|                                  |                                                                                    |
| 2. Frontend                      |                                                                                    |
| 2.1. install node:               | npm install -g node (^14.5.5)                                                      |
| 2.1. install react:              | npm install react (^16.14.0)                                                       |
| 2.2. install highcharts:         | npm install highcharts (^9.0.1) && npm install highcharts-react-official (^3.0.1)  |
| 2.3. install bootstrap:          | npm install bootstrap (^4.3.1)                                                     |



The current prototype can be found here:
http://www.svj753.de/
