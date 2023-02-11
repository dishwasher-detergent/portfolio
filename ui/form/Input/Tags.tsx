import { AnimatePresence, motion } from "framer-motion";
import { Plus, Trash } from "lucide-react";

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
    <div className="flex flex-col gap-1">
      <p className="text-xs pl-2 font-semibold text-slate-600">Tags</p>
      <div className="relative w-full p-2 min-h-[2rem] bg-slate-200 border border-slate-300 rounded-xl text-slate-400 flex flex-row gap-1 flex-wrap cursor-pointer">
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
                className="whitespace-nowrap rounded-full px-2 py-1 text-xs font-semibold text-white bg-emerald-600 group relative hover:bg-rose-600"
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
          className="h-9 px-2 py-1 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 w-full"
          maxLength={16}
          onChange={(e) => setTag(e.target.value)}
          value={tag}
        />
        <button
          disabled={tag && tags.indexOf(tag) != -1 ? true : false}
          className="p-2 grid place-items-center h-9 w-9 flex-none bg-blue-600 text-white rounded-xl disabled:bg-slate-300 disabled:text-slate-700"
          onClick={() => addTagsToArray()}
        >
          <Plus size={20} />
        </button>
      </div>
    </div>
  );
}
