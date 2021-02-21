# IoT-Blockchain
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


## Setting up the Ethereum client:
_Dependencies Installation: Linux, Raspbian_

| Task                    | Command                                                         |
|-------------------------|:---------------------------------------------------------------:|
|1. install golang:              https://golang.org/dl/ (v1.13.8) => wget https://dl.google.com/go/go1.13.8.linux-armv6l.tar.gz  (<= for raspbian, for linux vm => linux-amd64) |
| 2. Extracting:                  sudo tar -C /usr/local -xvf go1.13.8.linux-armv6l.tar.gz
| 3. Permissions:                 sudo chown root:root /usr/local/go
| 4. Permissions:                 sudo chmod 755 /usr/local/go
| 5. Environment variable:        sudo vi /etc/profile    =>  (write in last line)    export PATH=$PATH:/usr/local/go/bin
| 6. Reboot                       sudo reboot
| 7. install geth:                https://github.com/ethereum/go-ethereum/ (v1.9.25) => git clone https://github.com/ethereum/go-ethereum.git --branch v1.9.25
| 8. Setting geth up:             cd go-ethereum      =>    make geth (wait a couple of minutes)    => sudo mv ~/go-ethereum/build/bin/geth /usr/local/bin
| 9. Testing:                    go version          => geth version
| 10. Running script:             node data_transmission

Here's a line for us to start with.

This line is separated from the one above by two newlines, so it will be a *separate paragraph*.

This line is also a separate paragraph, but...
This line is only separated by a single newline, so it's a separate line in the *same paragraph*.

## Webserver:

TBD



## TODO
- [x] Create blockchain 
- [x] Send data from client to blockchain 
- [ ] Set up webserver and connect it to blockchain
