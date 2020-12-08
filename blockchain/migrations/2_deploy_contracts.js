const SimpleStorageContract = artifacts.require('SimpleStorage')
const PaymasterContract = artifacts.require('NaivePaymaster')
const RelayHubInterface = artifacts.require('IRelayHub')

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(SimpleStorageContract, process.env.FORWARDER_RINKEBY)
  await deployer.deploy(PaymasterContract)
  /// Network logic for choosing relay goes here, for now rinkeby only
  console.log("FLAG", network)
  let paymaster = await PaymasterContract.deployed()
  let instance = await SimpleStorageContract.deployed()
  ///
  await paymaster.setRelayHub(process.env.RELAY_RINKEBY)
  await paymaster.setTarget(instance.address)
  let relayHub = await RelayHubInterface.at(process.env.RELAY_RINKEBY)
  await relayHub.depositFor(instance.address, { value: 1e17 })
  console.log("Deposited: ", web3.utils.fromWei(await relayHub.balanceOf(instance.address)))
}
