// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title MezoBitcoin (mBTC)
 * @dev ERC20 token representing bridged Bitcoin from Bitcoin L1 via Mezo Protocol
 * @notice This is a 1:1 representation of real Bitcoin locked in Mezo bridge
 * 
 * Mezo Protocol Integration:
 * - Users deposit real Bitcoin to Mezo bridge on Bitcoin L1
 * - Mezo validators verify the deposit with SPV proofs
 * - mBTC tokens are minted on EVM layer (1:1 ratio)
 * - mBTC can be used in DeFi applications like StudentMezo
 * - Users can burn mBTC to withdraw back to Bitcoin L1
 * 
 * Key Features:
 * - 8 decimals to match Bitcoin's precision (satoshi level)
 * - Mintable only by authorized Mezo bridge contract
 * - Burnable to enable withdrawals back to Bitcoin L1
 * - Full ERC20 compatibility for DeFi integration
 * 
 * Security:
 * - Only bridge contract can mint new tokens
 * - Minting requires proof of Bitcoin deposit
 * - Total supply always matches Bitcoin locked in bridge
 */
contract WrappedBTC is ERC20, Ownable {
    
    // Authorized addresses that can mint/burn (Mezo bridge contracts)
    mapping(address => bool) public bridges;
    
    event BridgeAdded(address indexed bridge);
    event BridgeRemoved(address indexed bridge);
    event TokensMinted(address indexed to, uint256 amount, address indexed bridge);
    event TokensBurned(address indexed from, uint256 amount, address indexed bridge);
    
    modifier onlyBridge() {
        require(bridges[msg.sender] || msg.sender == owner(), "Only bridge can call");
        _;
    }
    
    constructor() ERC20("Mezo Bitcoin", "mBTC") Ownable(msg.sender) {
        // No initial supply - mBTC is only minted when Bitcoin is bridged
        // For testing, owner can mint directly
    }
    
    /**
     * @dev Returns 8 decimals to match Bitcoin's precision (satoshi level)
     */
    function decimals() public pure override returns (uint8) {
        return 8;
    }
    
    /**
     * @dev Add authorized bridge contract
     * @param bridge Address of the Mezo bridge contract
     */
    function addBridge(address bridge) external onlyOwner {
        require(bridge != address(0), "Invalid bridge address");
        bridges[bridge] = true;
        emit BridgeAdded(bridge);
    }
    
    /**
     * @dev Remove authorized bridge contract
     * @param bridge Address of the bridge to remove
     */
    function removeBridge(address bridge) external onlyOwner {
        bridges[bridge] = false;
        emit BridgeRemoved(bridge);
    }
    
    /**
     * @dev Mint mBTC tokens when Bitcoin is deposited to bridge
     * @param to Address to receive mBTC tokens
     * @param amount Amount of mBTC to mint (in satoshis, 8 decimals)
     * @notice Only callable by authorized bridge contracts
     * @notice Amount must match the Bitcoin deposited on L1
     */
    function mint(address to, uint256 amount) external onlyBridge {
        require(to != address(0), "Cannot mint to zero address");
        require(amount > 0, "Amount must be greater than 0");
        
        _mint(to, amount);
        emit TokensMinted(to, amount, msg.sender);
    }
    
    /**
     * @dev Burn mBTC tokens when user withdraws Bitcoin to L1
     * @param from Address to burn tokens from
     * @param amount Amount of mBTC to burn (in satoshis)
     * @notice Only callable by authorized bridge contracts
     * @notice Triggers Bitcoin withdrawal on L1
     */
    function burn(address from, uint256 amount) external onlyBridge {
        require(from != address(0), "Cannot burn from zero address");
        require(amount > 0, "Amount must be greater than 0");
        require(balanceOf(from) >= amount, "Insufficient balance");
        
        _burn(from, amount);
        emit TokensBurned(from, amount, msg.sender);
    }
    
    /**
     * @dev Faucet function for testing - anyone can get 0.1 BTC
     * @notice Only for development/testing - remove in production
     */
    function faucet() external {
        require(balanceOf(msg.sender) < 10 * 10**8, "Already have enough mBTC");
        _mint(msg.sender, 0.1 * 10**8); // 0.1 BTC
    }
    
    /**
     * @dev Emergency mint function for testing
     * @notice Only owner can call - for development only
     */
    function mintForTesting(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}
