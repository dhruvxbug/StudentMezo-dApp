// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title MezoBridge
 * @dev Interface for Mezo Protocol's Bitcoin bridge
 * @notice This contract handles bridging Bitcoin from Bitcoin L1 to EVM layer via Mezo
 * 
 * Mezo Protocol Overview:
 * - Mezo is a Bitcoin L2 that enables Bitcoin to interact with EVM-compatible smart contracts
 * - Users deposit real Bitcoin to Mezo bridge on Bitcoin L1
 * - Mezo mints equivalent mBTC tokens on the EVM layer (1:1 ratio)
 * - Smart contracts interact with mBTC as ERC20 tokens
 * - Users can withdraw back to Bitcoin L1 by burning mBTC
 * 
 * Production Integration:
 * - Replace this mock with actual Mezo SDK integration
 * - Use Mezo's official bridge contract addresses
 * - Implement proper Bitcoin SPV proofs
 * - Add Mezo validator signatures
 */
contract MezoBridge is Ownable, ReentrancyGuard {
    
    // Mezo Bitcoin token (mBTC) - ERC20 representation of bridged Bitcoin
    IERC20 public mBTC;
    
    // Bridge state tracking
    mapping(address => uint256) public bridgedBalance;
    mapping(bytes32 => bool) public processedDeposits;
    uint256 public totalBridged;
    
    // Events for bridge operations
    event BitcoinDeposited(
        address indexed user,
        bytes32 indexed btcTxHash,
        uint256 amount,
        string btcAddress
    );
    
    event mBTCMinted(
        address indexed user,
        uint256 amount,
        bytes32 indexed depositId
    );
    
    event WithdrawalRequested(
        address indexed user,
        uint256 amount,
        string btcAddress,
        bytes32 indexed withdrawalId
    );
    
    event mBTCBurned(
        address indexed user,
        uint256 amount,
        bytes32 indexed withdrawalId
    );
    
    constructor(address _mBTC) Ownable(msg.sender) {
        mBTC = IERC20(_mBTC);
    }
    
    /**
     * @dev Process a Bitcoin deposit from L1 and mint mBTC
     * @param user Address to receive mBTC tokens
     * @param amount Amount of Bitcoin deposited (in satoshis, 8 decimals)
     * @param btcTxHash Bitcoin transaction hash proving the deposit
     * @param btcAddress User's Bitcoin address that made the deposit
     * 
     * PRODUCTION: This function should be called by Mezo validators with proper proofs
     * - Verify Bitcoin SPV proof
     * - Check validator signatures
     * - Validate Bitcoin transaction confirmation depth
     * - Ensure minimum confirmations (e.g., 6 blocks)
     */
    function processDeposit(
        address user,
        uint256 amount,
        bytes32 btcTxHash,
        string calldata btcAddress
    ) external onlyOwner nonReentrant {
        require(user != address(0), "Invalid user address");
        require(amount > 0, "Amount must be greater than 0");
        require(!processedDeposits[btcTxHash], "Deposit already processed");
        
        // Mark deposit as processed
        processedDeposits[btcTxHash] = true;
        
        // Update tracking
        bridgedBalance[user] += amount;
        totalBridged += amount;
        
        // Mint mBTC tokens to user (1:1 with Bitcoin)
        // Note: This assumes mBTC contract has mint function accessible
        // In production, this would be the actual Mezo mBTC token contract
        require(
            mBTC.transfer(user, amount),
            "mBTC transfer failed"
        );
        
        emit BitcoinDeposited(user, btcTxHash, amount, btcAddress);
        emit mBTCMinted(user, amount, btcTxHash);
    }
    
    /**
     * @dev Request withdrawal of Bitcoin back to L1
     * @param amount Amount of mBTC to burn and withdraw as Bitcoin
     * @param btcAddress Bitcoin address to receive the withdrawn Bitcoin
     * 
     * PRODUCTION: This initiates the withdrawal process
     * - Burn mBTC tokens
     * - Create withdrawal request for Mezo validators
     * - Validators process and send Bitcoin on L1
     * - Include withdrawal fee for Bitcoin transaction costs
     */
    function requestWithdrawal(
        uint256 amount,
        string calldata btcAddress
    ) external nonReentrant returns (bytes32) {
        require(amount > 0, "Amount must be greater than 0");
        require(bytes(btcAddress).length > 0, "Invalid Bitcoin address");
        require(mBTC.balanceOf(msg.sender) >= amount, "Insufficient mBTC balance");
        
        // Generate withdrawal ID
        bytes32 withdrawalId = keccak256(
            abi.encodePacked(msg.sender, amount, btcAddress, block.timestamp)
        );
        
        // Transfer mBTC from user to bridge for burning
        require(
            mBTC.transferFrom(msg.sender, address(this), amount),
            "mBTC transfer failed"
        );
        
        // Update tracking
        bridgedBalance[msg.sender] -= amount;
        totalBridged -= amount;
        
        emit WithdrawalRequested(msg.sender, amount, btcAddress, withdrawalId);
        emit mBTCBurned(msg.sender, amount, withdrawalId);
        
        // PRODUCTION: Submit withdrawal to Mezo validator network
        // Validators will process and send Bitcoin on L1
        
        return withdrawalId;
    }
    
    /**
     * @dev Get user's bridged Bitcoin balance
     */
    function getBridgedBalance(address user) external view returns (uint256) {
        return bridgedBalance[user];
    }
    
    /**
     * @dev Check if a Bitcoin deposit has been processed
     */
    function isDepositProcessed(bytes32 btcTxHash) external view returns (bool) {
        return processedDeposits[btcTxHash];
    }
}
