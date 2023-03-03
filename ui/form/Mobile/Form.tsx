"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";

interface MobileFormWrapperProps {
  children: React.ReactElement;
  trigger: React.ReactElement;
}

export default function MobileForm({
  children,
  trigger,
}: MobileFormWrapperProps) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <AnimatePresence>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-slate-900/10" />
          <Dialog.Content asChild>
            <motion.div
              initial={{ y: 300, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 300, opacity: 0 }}
              transition={{ ease: "anticipate" }}
              key={123}
              className="fixed bottom-0 left-0 z-50 h-4/5 w-full overflow-hidden rounded-t-xl bg-white p-6 dark:bg-slate-900"
            >
              {children}
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="absolute top-6 right-6 hover:text-rose-600"
                  aria-label="Close"
                >
                  <XIcon size={20} />
                </button>
              </Dialog.Close>
            </motion.div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </AnimatePresence>
  );
}
