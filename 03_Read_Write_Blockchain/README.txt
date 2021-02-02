Requirements: 
-nodejs (sudo apt install nodejs)
-npm (sudo apt install npm)
-web3 (sudo npm install -g web3)
-static-server (sudo npm install -g static-server)
-truffle (sudo npm install -g truffle)

Launch the Project:
I: start Webserver: 'npm start' in the project folder
II: start truffle framework: 'truffle develop'
III: migrate the blockchain: (in the develop console) 'migrate --reset'
IV: open files: bundle.js ('public' folder) and SimpleStorage.json ('build/contracts' folder)
V: in bundle.js replace:
  -ABI with the one found in the SimpleStorage.json
  -Address with the one from the truffle develop-console (scroll up a little bit to 'contract address' of 'SimpleStorage')
VI: Open Webbrowser and connect to 'https://localhost:9080'

The webserver offers a interface to write data to a blockchain and shows the current content
