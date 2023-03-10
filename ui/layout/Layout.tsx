import React from "react";
import Nav from "#/ui/layout/nav/Nav";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div
      className={`relative flex min-h-screen w-full flex-col items-center dark:bg-slate-900`}
    >
      <Nav />
      <div className="relative z-10 w-full max-w-[90rem] flex-1 px-4 sm:px-6 md:px-8">
        {children}
      </div>
    </div>
  );
}

export default Layout;
