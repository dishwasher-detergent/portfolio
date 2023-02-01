import React from "react";
import Nav from "#/ui/layout/Nav";

interface LayoutProps {
  children: React.ReactNode;
  className: string;
}

function Layout({ children, className }: LayoutProps) {
  return (
    <div
      className={`relative flex min-h-screen w-full flex-col items-center dark:bg-slate-900 ${className}`}
    >
      <Nav />
      <div className="py-4 z-10 w-full max-w-[90rem] flex-1 px-4 sm:px-6 md:px-8">
        <main>{children}</main>
      </div>
      {/* <div className="fixed inset-0 overflow-hidden">
        <div
          style={{ left: "max(0px,calc(50% - 45rem))" }}
          className="radial absolute top-0 bottom-0 left-0 aspect-square w-full -translate-x-1/2 -translate-y-1/2 opacity-[0.15]"
        />
      </div> */}
    </div>
  );
}

export default Layout;
