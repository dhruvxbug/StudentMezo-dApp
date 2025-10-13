import { Linkedin, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const footerLinks = {
  primary: [
    { label: "Pricing", href: "#pricing" },
    { label: "Blog", href: "#blog" },
  ],
  secondary: [
    { label: "Privacy policy", href: "#privacy" },
    { label: "Terms of service", href: "#terms" },
  ],
};

export default function FooterMerlin({ className }) {
  return (
    <footer className="bg-gradient-to-b from-gray-100 via-indigo-800 to-black">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <span>Press</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2 text-base font-medium text-slate-700 shadow-sm">
              <a href="/ContactUs">this</a>
              <span className="rounded-md border border-slate-300 px-2 py-0.5 text-xs leading-none text-slate-500">
                ⎵
              </span>
            </span>
            <span>to visit Contact Us page.</span>
          </div>

          <div className="flex items-center gap-3 text-slate-500">
            <a
              className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-300 bg-white transition-colors hover:border-slate-400 hover:text-slate-700"
              href="https://www.linkedin.com"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-300 bg-white transition-colors hover:border-slate-400 hover:text-slate-700"
              href="mailto:hello@peerpledge.xyz"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-10 sm:gap-12">
          <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
            <div className="flex items-center mx-auto">
              <span className="text-6xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[200px] font-bold tracking-tight text-white">PeerPledge</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
