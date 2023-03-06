"use client";

import { AnimatePresence } from "framer-motion";

export function PresenceWrapper({ children }: { children: React.ReactNode }) {
  return <AnimatePresence initial={false} mode="wait" onExitComplete={() => window.scrollTo({top: 0})}>{children}</AnimatePresence>;
}
