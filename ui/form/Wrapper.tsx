"use client";

import useWindowDimensions from "#/hooks/useWindowDimensions";
import Card from "#/ui/form/Card";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { X as XIcon } from "lucide-react";
import { useState } from "react";

interface FormDisplayWrapperProps {
  children: React.ReactElement;
  trigger: React.ReactElement;
  modal?: boolean;
}

export default function FormDisplayWrapper({
  children,
  trigger,
  modal = false,
}: FormDisplayWrapperProps) {
  const [open, setOpen] = useState(false);
  const { width } = useWindowDimensions();

  if (modal && width > 768)
    return (
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-slate-900/10" />
          <Dialog.Content className="fixed top-1/2 left-1/2 z-50 h-3/5 max-h-full w-[30rem] max-w-full -translate-y-1/2 -translate-x-1/2 overflow-hidden rounded-xl bg-white p-6 dark:bg-slate-900">
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
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );

  return width <= 768 ? (
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
  ) : (
    <>{children}</>
  );
}
