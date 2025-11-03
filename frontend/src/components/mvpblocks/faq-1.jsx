import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { PlusIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
const items = [
  {
    id: "1",
    title: "What is the Student Micro-Lending DApp?",
    content:
      "It’s a decentralized platform where students can borrow against Bitcoin collateral, mint MUSD, and access microloans for education—while lenders fund loans and earn yield, all on-chain.",
  },
  {
    id: "2",
    title: "How can students get verified?",
    content:
      "Students connect their wallet and verify their identity using campus email or Mezo Passport. This ensures only eligible students access loans.",
  },
  {
    id: "3",
    title: "How does lending work for peers?",
    content:
      "Anyone can deposit MUSD into the lending pool. Funds are matched to student loan requests automatically, and lenders earn interest on their contribution.",
  },
  {
    id: "4",
    title: "Is my Bitcoin safe on the platform?",
    content:
      "Yes, your Bitcoin is locked in audited smart contracts and used purely as collateral; you control your keys and can repay to withdraw at any time.",
  },
  {
    id: "5",
    title: "Are repayments and rewards tracked?",
    content:
      "All repayments, milestone achievements, and rewards (like NFT badges) are transparently managed via smart contracts and visible on your dashboard.",
  },
  {
    id: "6",
    title: "Do I need coding experience to use the app?",
    content:
      "No! The DApp is student-friendly, with clear steps for borrowing, repayment, and lending—no coding needed.",
  },
  {
    id: "7",
    title: "What are the main benefits for students and lenders?",
    content:
      "Students get fast, collateral-backed microloans for studies; lenders earn yield while supporting real educational goals.",
  },
  {
    id: "8",
    title: "How do I get started?",
    content:
      "Connect your wallet, complete identity verification, and use the app’s dashboard to apply for loans or lend to peers in minutes.",
  },
]

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index,
      duration: 0.4,
    },
  }),
};
export function FaqSection() {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-10 text-center">
          <motion.h2
            className="mb-4 text-3xl font-bold tracking-tight md:text-4xl"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>
            Frequently Asked{" "}
            <span className="bg-indigo-800 bg-clip-text text-transparent">
              Questions
            </span>
          </motion.h2>
          <motion.p
            className="text-muted-foreground mx-auto max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}>
            Everything you need to know about PeerPledge and common doubts.
          </motion.p>
        </div>

        <motion.div
          className="relative mx-auto max-w-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 5, delay: 0.3 }}>
          {/* Decorative gradient */}
          <div className="bg-blue-750 absolute -top-4 -left-4 -z-10 h-72 w-72 rounded-full blur-3xl" />
          <div className="bg-blue-750 absolute -right-4 -bottom-4 -z-10 h-72 w-72 rounded-full blur-3xl" />

          <Accordion
            type="single"
            collapsible
            className="border-border/40 bg-card/30 w-full rounded-xl border p-2 backdrop-blur-sm"
            defaultValue="1">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                custom={index}
                variants={fadeInAnimationVariants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}>
                <AccordionItem
                  value={item.id}
                  className={cn(
                    "bg-card/50 my-1 overflow-hidden rounded-lg border-none px-2 shadow-sm transition-all",
                    "data-[state=open]:bg-card/80 data-[state=open]:shadow-md",
                  )}>
                  <AccordionPrimitive.Header className="flex">
                    <AccordionPrimitive.Trigger
                      className={cn(
                        "group flex flex-1 items-center justify-between gap-4 py-4 text-left text-base font-medium",
                        "hover:text-primary transition-all duration-300 outline-none",
                        "focus-visible:ring-primary/50 focus-visible:ring-2",
                        "data-[state=open]:text-primary",
                      )}>
                      {item.title}
                      <PlusIcon
                        size={18}
                        className={cn(
                          "text-primary/70 shrink-0 transition-transform duration-300 ease-out",
                          "group-data-[state=open]:rotate-45",
                        )}
                        aria-hidden="true"
                      />
                    </AccordionPrimitive.Trigger>
                  </AccordionPrimitive.Header>
                  <AccordionContent
                    className={cn(
                      "text-muted-foreground overflow-hidden pt-0 pb-4",
                      "data-[state=open]:animate-accordion-down",
                      "data-[state=closed]:animate-accordion-up",
                    )}>
                    <div className="border-border/30 border-t pt-3">
                      {item.content}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}

export default FaqSection;