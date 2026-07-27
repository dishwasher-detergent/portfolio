interface TagsProps {
  tags: string[];
}

export const Tags = ({ tags }: TagsProps) => {
  return (
    <div className="my-2 flex flex-row flex-wrap gap-1.5">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="rounded-lg bg-gray-200 px-1.5 py-0.5 text-xs font-semibold dark:bg-slate-800 dark:text-slate-200"
        >
          {tag}
        </span>
      ))}
    </div>
  );
};
