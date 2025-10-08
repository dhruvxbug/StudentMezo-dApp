// Contract addresses (update after deployment)
export const CONTRACT_ADDRESSES = {
  MUSD: '0x0000000000000000000000000000000000000000',
  StudentLoanNFT: '0x0000000000000000000000000000000000000000',
  StudentLoanPlatform: '0x0000000000000000000000000000000000000000',
};

// Contract ABIs (simplified - import full ABIs from artifacts)
export const MUSD_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function transfer(address to, uint256 amount) returns (bool)",
];

export const PLATFORM_ABI = [
  "function students(address) view returns (bool isVerified, uint256 totalBorrowed, uint256 totalRepaid, uint256 reputationScore)",
  "function depositCollateralAndMintMUSD() payable",
  "function requestLoan(uint256 amount, uint256 duration, string purpose) returns (uint256)",
  "function contributeToPool(uint256 amount)",
  "function repayLoan(uint256 loanId, uint256 amount)",
  "function getLoan(uint256 loanId) view returns (tuple(uint256 id, address student, uint256 amount, uint256 collateralAmount, uint256 interestRate, uint256 duration, uint256 startTime, uint256 amountRepaid, uint8 status, string purpose))",
  "function getStudentLoans(address student) view returns (uint256[])",
  "function calculateTotalOwed(uint256 loanId) view returns (uint256)",
  "function getLenderStats(address lender) view returns (uint256 contributed, uint256 earned)",
  "event LoanRequested(uint256 indexed loanId, address indexed student, uint256 amount)",
  "event LoanFunded(uint256 indexed loanId, uint256 amount)",
  "event LoanRepaid(uint256 indexed loanId, uint256 amount)",
];

export const NFT_ABI = [
  "function getUserAchievements(address user) view returns (uint256[])",
  "function getAchievement(uint256 tokenId) view returns (tuple(uint8 achievementType, uint256 timestamp, string metadata))",
  "function totalSupply() view returns (uint256)",
];
