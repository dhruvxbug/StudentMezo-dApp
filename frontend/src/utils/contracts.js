// Contract addresses (updated from local deployment with Mezo Bitcoin integration)
export const CONTRACT_ADDRESSES = {
  mBTC: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  MezoBridge: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
  MUSD: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
  StudentLoanNFT: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
  StudentLoanPlatform: '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9',
};

// Contract ABIs (simplified - import full ABIs from artifacts)
export const MBTC_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function decimals() view returns (uint8)",
  "function faucet()",
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "event Approval(address indexed owner, address indexed spender, uint256 value)",
];

export const MUSD_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function transfer(address to, uint256 amount) returns (bool)",
];

export const PLATFORM_ABI = [
  "function students(address) view returns (bool isVerified, uint256 totalBorrowed, uint256 totalRepaid, uint256 reputationScore)",
  "function depositCollateralAndMintMUSD(uint256 mBtcAmount)",
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
