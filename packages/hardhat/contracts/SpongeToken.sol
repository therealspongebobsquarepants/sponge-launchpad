//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title SpongeToken
 * @dev A standard ERC-20 token for the $SPONGE memecoin on Base.
 *      "I'm ready! I'm ready! I'm ready!"
 */
contract SpongeToken is ERC20, Ownable {
    uint256 public constant MAX_SUPPLY = 1_000_000_000 * 10**18; // 1 Billion

    constructor() ERC20("SpongeBot", "SPONGE") {
        // Mint the entire supply to the deployer (SpongBot)
        _mint(msg.sender, MAX_SUPPLY);
    }

    /**
     * @dev Burn function for deflationary mechanics if needed later.
     */
    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }
}
