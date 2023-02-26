"use client";

import { AnimatePresence } from "framer-motion";

export function PresenceWrapper({ children }: { children: React.ReactNode }) {
  return <AnimatePresence mode="wait">{children}</AnimatePresence>;
}
