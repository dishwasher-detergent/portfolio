import { createElement } from "react";

export default function Card(props: any) {
  return createElement(
    props.type ? props.type : "div",
    {
      ...props,
      className: `w-full rounded-xl border border-slate-300 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800 ${props.className}`,
    },
    <>
      {props.title && (
        <h2 className="display px-2 pb-4 text-2xl font-bold text-slate-900 dark:text-white">
          {props.title}
        </h2>
      )}
      {props.children}
    </>
  );
}
