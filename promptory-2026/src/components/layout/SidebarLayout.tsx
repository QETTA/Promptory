"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { layout } from "@/lib/tokens";

interface SidebarLayoutProps {
  sidebar: ReactNode;
  navbar?: ReactNode;
  children: ReactNode;
  className?: string;
}

function SidebarLayout({ sidebar, navbar, children, className }: SidebarLayoutProps) {
  // Token-based layout values
  const navbarHeight = layout.navbar.height; // 4rem (64px)
  const sidebarWidth = layout.sidebar.width; // 20rem (320px)

  return (
    <div className={cn("min-h-screen bg-neutral-50 dark:bg-neutral-950", className)}>
      {navbar && (
        <header 
          className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border-b border-neutral-200 dark:border-neutral-800"
          style={{ height: navbarHeight }}
        >
          <div className="h-full px-4 lg:px-6 flex items-center">
            {navbar}
          </div>
        </header>
      )}
      
      <div 
        className={cn("flex")} 
        style={{ paddingTop: navbar ? navbarHeight : 0 }}
      >
        {/* Sidebar - Zone A */}
        <aside 
          className="fixed left-0 bottom-0 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 overflow-y-auto hidden lg:block"
          style={{ 
            top: navbar ? navbarHeight : 0, 
            width: sidebarWidth 
          }}
        >
          <div className="p-4">
            {sidebar}
          </div>
        </aside>

        {/* Main Content */}
        <main 
          className="flex-1 min-h-screen"
          style={{ 
            marginLeft: sidebarWidth,
            minHeight: navbar ? `calc(100vh - ${navbarHeight})` : '100vh'
          }}
        >
          <div className="max-w-7xl mx-auto p-4 lg:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export { SidebarLayout };
