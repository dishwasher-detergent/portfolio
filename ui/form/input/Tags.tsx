import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

interface TagInputProps {
  setTags: Function;
  tags: string[];
  setTag: Function;
  tag: string;
}

export default function TagInput({
  setTags,
  tags,
  setTag,
  tag,
}: TagInputProps) {
  const addTagsToArray = () => {
    if (tag == null || tag == "") return;
    if (tags.includes(tag)) return;
    setTags([...tags, tag]);
    setTag("");
  };

  const removeTagsFromArray = (e: string) => {
    const newTagArray = tags.filter((tag) => tag != e);
    setTags(newTagArray);
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="pl-2 text-xs font-semibold text-slate-600 dark:text-slate-200">
        Tags
      </p>
      <div className="relative flex min-h-[2rem] w-full cursor-pointer flex-row flex-wrap gap-1 rounded-xl border bg-slate-200 p-2 text-slate-400 dark:border-slate-700 dark:bg-slate-900">
        <AnimatePresence initial={false} mode="popLayout">
          {tags.map((item: string) => {
            if (item == null) return;
            return (
              <motion.button
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  opacity: { duration: 0.2 },
                  layout: {
                    type: "spring",
                    bounce: 0.4,
                    duration: 0.5,
                  },
                }}
                key={item}
                type="button"
                className="group relative whitespace-nowrap rounded-full bg-emerald-600 px-2 py-1 text-xs font-semibold text-white hover:bg-rose-600"
                onClick={() => removeTagsFromArray(item)}
              >
                {item}
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>
      <div className="flex flex-row gap-2">
        <input
          type="text"
          placeholder="Add Tag"
          className="h-9 w-full rounded-xl border border-slate-300 px-2 py-1 text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          maxLength={16}
          onChange={(e) => setTag(e.target.value)}
          value={tag}
          onKeyDown={(e) => {
            if (e.key == "Tab") {
              e.preventDefault();
              addTagsToArray();
            }
          }}
        />
        <button
          disabled={tag && tags.indexOf(tag) != -1 ? true : false}
          type="button"
          className="grid h-9 w-9 flex-none place-items-center rounded-xl bg-blue-600 p-2 text-white disabled:bg-slate-300 disabled:text-slate-700"
          onClick={() => addTagsToArray()}
        >
          <Plus size={20} />
        </button>
      </div>
    </div>
  );
}
