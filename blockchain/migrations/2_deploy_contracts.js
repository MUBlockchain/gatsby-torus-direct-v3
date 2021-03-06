const SimpleStorageContract = artifacts.require('SimpleStorage')
const PaymasterContract = artifacts.require('NaivePaymaster')
const RelayHubInterface = artifacts.require('IRelayHub')

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(SimpleStorageContract, process.env.FORWARDER_RINKEBY)
  await deployer.deploy(PaymasterContract)
  /// Network logic for choosing relay goes here, for now rinkeby only
  const paymaster = await PaymasterContract.deployed()
  const instance = await SimpleStorageContract.deployed()
  ///
  await paymaster.setRelayHub(process.env.RELAY_RINKEBY)
  await paymaster.setTarget(instance.address)
  await paymaster.setTrustedForwarder(process.env.FORWARDER_RINKEBY)
  const relayHub = await RelayHubInterface.at(process.env.RELAY_RINKEBY)
  await relayHub.depositFor(paymaster.address, { from: accounts[0], value: 1e18 })
}

