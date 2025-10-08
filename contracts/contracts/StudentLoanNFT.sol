// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title StudentLoanNFT
 * @dev NFT rewards for students achieving milestones
 */
contract StudentLoanNFT is ERC721, Ownable {
    uint256 private _tokenIdCounter;
    
    enum AchievementType {
        FIRST_LOAN,
        FIRST_REPAYMENT,
        LOAN_COMPLETED,
        PERFECT_RECORD,
        TOP_BORROWER
    }
    
    struct Achievement {
        AchievementType achievementType;
        uint256 timestamp;
        string metadata;
    }
    
    mapping(uint256 => Achievement) public achievements;
    mapping(address => uint256[]) public userAchievements;
    
    event AchievementMinted(address indexed student, uint256 tokenId, AchievementType achievementType);
    
    constructor() ERC721("StudentMezo Achievement", "SMA") Ownable(msg.sender) {}
    
    function mintAchievement(
        address student,
        AchievementType achievementType,
        string memory metadata
    ) external onlyOwner returns (uint256) {
        _tokenIdCounter++;
        uint256 tokenId = _tokenIdCounter;
        
        _mint(student, tokenId);
        
        achievements[tokenId] = Achievement({
            achievementType: achievementType,
            timestamp: block.timestamp,
            metadata: metadata
        });
        
        userAchievements[student].push(tokenId);
        
        emit AchievementMinted(student, tokenId, achievementType);
        
        return tokenId;
    }
    
    function getUserAchievements(address user) external view returns (uint256[] memory) {
        return userAchievements[user];
    }
    
    function getAchievement(uint256 tokenId) external view returns (Achievement memory) {
        return achievements[tokenId];
    }
    
    function totalSupply() external view returns (uint256) {
        return _tokenIdCounter;
    }
}
