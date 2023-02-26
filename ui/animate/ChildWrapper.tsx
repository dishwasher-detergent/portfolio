"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export function ChildWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <motion.div
      initial={{ y: 300, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 300, opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      key={pathname}
    >
      {children}
    </motion.div>
  );
}
