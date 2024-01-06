interface TagsProps {
  tags: string[];
}

export const Tags = ({ tags }: TagsProps) => {
  return (
    <div className="flex flex-row flex-wrap gap-2">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="bg-gray-200 rounded-lg px-2 py-1 text-xs font-semibold dark:bg-slate-800 dark:text-slate-200"
        >
          {tag}
        </span>
      ))}
    </div>
  );
};
