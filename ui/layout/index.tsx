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
      <div className="py-4 z-10 w-full max-w-[90rem] flex-1 px-4 sm:px-6 md:px-8 relative">
        {children}
      </div>
    </div>
  );
}

export default Layout;
