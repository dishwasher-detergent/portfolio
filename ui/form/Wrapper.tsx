"use client";

import useWindowDimensions from "#/hooks/useWindowDimensions";
import Card from "#/ui/form/Card";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, X as XIcon } from "lucide-react";
import { useState } from "react";

export default function FormDisplayWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const { width } = useWindowDimensions();

  return width <= 768 ? (
    <AnimatePresence>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <button
            type="button"
            className="fixed bottom-4 right-4 grid place-items-center overflow-hidden rounded-full bg-blue-500 p-4 text-white"
            //   onClick={() => deleteProject()}
          >
            <Plus size={24} />
          </button>
        </Dialog.Trigger>
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
    <Card
      type="div"
      className="sticky top-20 flex h-[50rem] max-h-full w-[30rem] max-w-full flex-none flex-col overflow-hidden rounded-xl border  border-slate-200 text-white dark:border-slate-700 md:w-96"
    >
      {children}
    </Card>
  );
}
