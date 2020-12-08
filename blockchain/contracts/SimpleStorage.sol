pragma solidity >=0.6.0 <0.8.0;

import "@opengsn/gsn/contracts/BaseRelayRecipient.sol";

contract SimpleStorage is BaseRelayRecipient {
    uint storedData;

    function set(uint x) public {
        storedData = x;
    }

    function get() public view returns (uint) {
        return storedData;
    }
}