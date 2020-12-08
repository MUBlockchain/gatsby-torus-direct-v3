const SimpleStorageContract = artifacts.require('SimpleStorage')
const PaymasterContract = artifacts.require('Paymaster')
const RelayHub = artifacts.require('RelayHub')

module.exports = function (deployer, accounts, network) {
  await deployer.deploy(SimpleStorageContract)
  await deployer.deploy(PaymasterContract)
  /// Network logic for choosing relay goes here, for now rinkeby only
  if (network !== '4') throw new Error('GSN should only migrate to Rinkeby in this app!')
  let paymaster = await PaymasterContract.deployed()
  let instance = await SimpleStorageContract.deployed()
  ///
  await paymaster.setRelayHub(process.env.RELAY_RINKEBY)
  await paymaster.setTarget(instance.address)
  let relayHub = await RelayHub.at(process.env.RELAY_RINKEBY)
  await relayHub.depositFor(instance.address, { value: 1e17 })
  console.log(await relayHub.balanceOf(instance.address))
}
