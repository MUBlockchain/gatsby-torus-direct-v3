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
  const relayHub = await RelayHubInterface.at(process.env.RELAY_RINKEBY)
  await relayHub.depositFor(instance.address, { value: 1e17 })
}
