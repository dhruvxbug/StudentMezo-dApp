import { Link } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { FaqSection } from "../components/mvpblocks/faq-1"
import { Page } from "../components/mvpblocks/sparkles-logo"
import MagicBento from "../components/MagicBento"

function HomePage() {
  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="w-full mx-auto px-4 sm:px-6 h-screen lg:px-8 top-20 py-16 md:py-24 bg-gradient-to-b from-gray-50 via-gray-50 to-indigo-900">
        <div className="text-center mx-auto max-w-6xl bg-gradient-to-r from-indigo-800 via-black to-indigo-800 rounded-3xl p-8 md:p-16 text-white shadow-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            PeerPledge
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

      <Page className="relative">
      </Page>
       <section className="bg-black w-full flex items-center justify-center">
       <MagicBento 
         textAutoHide={true}
         enableStars={true}
         enableSpotlight={true}
         enableBorderGlow={true}
         enableTilt={true}
         enableMagnetism={true}
         clickEffect={true}
         spotlightRadius={300}
         particleCount={12}
         glowColor="132, 0, 255"
       />
       </section>

      {/* CTA Section */}
      <section className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-b from-black via-indigo-900 to-transparent">
        <div className="text-center max-w-6xl mt-0 mx-auto bg-white rounded-3xl p-8 md:p-16 shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            Get Started Today
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of students and lenders building the future of educational finance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/student"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-indigo-800 via-neutral-800 to-indigo-800 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
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

    {/* FAQ section */}
    <section>
      <FaqSection />
    </section>

 
   
    </div>
  );
}

export default HomePage;
