const HDWalletProvider = require('@truffle/hdwallet-provider')
require('dotenv').config()

module.exports = {

  networks: {
    // networkCheckTimeout: {
    //   wss: true
    // }
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*'
  },
    rinkeby: {
      provider: () => {
          return new HDWalletProvider(process.env.MNEMONIC, `https://rinkeby.infura.io/v3/${process.env.INFURA}`)
      },
      network_id: '4'
  },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.6.10",
      settings: {
       optimizer: {
         enabled: false,
         runs: 200
       }
      }
    }
  }
}
