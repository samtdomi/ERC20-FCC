// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract OurToken is ERC20 {

    // initial supply hass to be 18 decimal places, dont just put "50"
    // uint256 initialSupply = 50e18;  <- correct way to write 50
    constructor(uint256 initialSupply) ERC20("OurToken", "OT") {
        _mint(msg.sender, initialSupply);

    }

}
