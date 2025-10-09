import { Link } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { BentoGrid, BentoGridItem } from '../components/ui/bento-grid';

function HomePage() {
  const features = [
    {
      icon: "🔐",
      title: "1. Connect Wallet",
      description: "Securely connect your wallet using WalletConnect",
      className: "md:col-span-1"
    },
    {
      icon: "₿",
      title: "2. Deposit Bitcoin",
      description: "Deposit Bitcoin via Mezo to mint MUSD stablecoins",
      className: "md:col-span-1"
    },
    {
      icon: "📚",
      title: "3. Request Loans",
      description: "Students request microloans for education expenses",
      className: "md:col-span-1"
    },
    {
      icon: "💰",
      title: "4. Earn Yield",
      description: "Lenders pool MUSD and earn interest from repayments",
      className: "md:col-span-1"
    },
    {
      icon: "🎖️",
      title: "5. Earn NFTs",
      description: "Complete milestones and earn achievement NFTs",
      className: "md:col-span-1"
    },
    {
      icon: "📊",
      title: "6. Track Progress",
      description: "Monitor loans and reputation on the dashboard",
      className: "md:col-span-1"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 rounded-3xl p-8 md:p-16 text-white shadow-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            StudentMezo DApp
          </h1>
          <p className="text-xl md:text-2xl mb-4 opacity-95">
            Decentralized Microloans for Education Powered by Bitcoin & Mezo
          </p>
          <p className="text-base md:text-lg mb-8 opacity-90 max-w-3xl mx-auto">
            Students deposit Bitcoin, mint MUSD, and access microloans. Peer lenders earn yield by funding education.
          </p>
          <div className="flex justify-center">
            <ConnectButton />
          </div>
        </div>
      </section>

      {/* Features Section with Bento Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          How It Works
        </h2>
        <BentoGrid>
          {features.map((feature, idx) => (
            <BentoGridItem
              key={idx}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              className={feature.className}
            />
          ))}
        </BentoGrid>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center bg-white rounded-3xl p-8 md:p-16 shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            Get Started Today
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of students and lenders building the future of educational finance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/student"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Student Dashboard
            </Link>
            <Link
              to="/lender"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-purple-600 bg-white border-2 border-purple-600 rounded-xl hover:bg-purple-50 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Lender Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          <div className="bg-white rounded-2xl p-6 md:p-8 text-center shadow-lg">
            <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
              $0
            </div>
            <div className="text-sm md:text-base text-gray-600">
              Total Loans Funded
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 md:p-8 text-center shadow-lg">
            <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
              0
            </div>
            <div className="text-sm md:text-base text-gray-600">
              Active Students
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 md:p-8 text-center shadow-lg">
            <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
              0
            </div>
            <div className="text-sm md:text-base text-gray-600">
              Active Lenders
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 md:p-8 text-center shadow-lg">
            <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
              0%
            </div>
            <div className="text-sm md:text-base text-gray-600">
              Default Rate
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
