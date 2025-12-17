"use client";

import { X } from "lucide-react";
import { Tab } from "@/types";
import { cn } from "@/lib/utils";

interface TabSystemProps {
  tabs: Tab[];
  activeTabId: string;
  onTabChange: (tabId: string) => void;
  onTabClose: (tabId: string) => void;
}

export function TabSystem({
  tabs,
  activeTabId,
  onTabChange,
  onTabClose,
}: TabSystemProps) {
  return (
    <div className="bg-vscode-sidebar border-b border-vscode flex items-center h-9 overflow-hidden">
      <div className="flex flex-1 overflow-x-auto scrollbar-none">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={cn(
              "flex items-center gap-2 px-4 py-2 border-r border-gray-700 cursor-pointer min-w-[150px] max-w-[250px] transition-colors",
              tab.id === activeTabId
                ? "bg-yellow-500 text-black"
                : "bg-vscode-active text-white hover:bg-yellow-500/10"
            )}
            onClick={() => onTabChange(tab.id)}
          >
            <span className="flex-1 truncate text-sm font-medium">
              {tab.title}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onTabClose(tab.id);
              }}
              className={cn(
                "p-1 rounded hover:bg-black/20 transition-colors",
                tab.id === activeTabId ? "text-gray-900" : "text-gray-400"
              )}
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>

      {tabs.length > 10 && (
        <div className="px-2 text-xs text-gray-400">
          +{tabs.length - 10} more
        </div>
      )}
    </div>
  );
}
