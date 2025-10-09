import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../lib/utils";

export function ResizableNavbar({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/student", label: "Student Dashboard" },
    { path: "/lender", label: "Lender Dashboard" },
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:block fixed top-0 w-full z-50 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 backdrop-blur-sm shadow-lg border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              to="/"
              className="flex items-center space-x-2 text-white font-bold text-xl hover:opacity-80 transition-opacity"
            >
              <span className="text-2xl">🎓</span>
              <span>StudentMezo</span>
            </Link>

            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "text-white/90 hover:text-white transition-all duration-200 font-medium relative",
                    location.pathname === item.path && "text-white"
                  )}
                >
                  {item.label}
                  {location.pathname === item.path && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-2 left-0 right-0 h-0.5 bg-white"
                      initial={false}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
              <div className="ml-4">{children}</div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="md:hidden fixed top-0 w-full z-50 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 backdrop-blur-sm shadow-lg">
        <div className="px-4">
          <div className="flex justify-between items-center h-16">
            <Link
              to="/"
              className="flex items-center space-x-2 text-white font-bold text-xl"
            >
              <span className="text-2xl">🎓</span>
              <span>StudentMezo</span>
            </Link>

            <div className="flex items-center space-x-4">
              <div className="scale-90">{children}</div>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:text-white/80 transition-colors"
                aria-label="Toggle menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="py-4 space-y-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "block px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all",
                        location.pathname === item.path &&
                          "bg-white/20 text-white font-medium"
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-16" />
    </>
  );
}
