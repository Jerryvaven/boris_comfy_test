"use client";

import React, { useState, useEffect } from "react";
import { WriterToolbar } from "@/components/features/writer/writer-toolbar";
import { TabSystem } from "@/components/features/writer/tab-system";
import { CharacterSidebar } from "@/components/features/writer/character/character-sidebar";
import { ScriptEditor } from "@/components/features/writer/script-editor";
import { IllustratedComicBook } from "@/components/features/writer/illustrated-comic-book";
import { Tab, Comic, Character, Panel } from "@/types";
import { generateId } from "@/lib/utils";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import {
  DEMO_CHARACTERS,
  DEMO_PANELS,
  INITIAL_TABS,
  DEFAULT_WRITER_SETTINGS,
  CHARACTER_SIDEBAR_WIDTH,
} from "@/constants/writer";

export default function WriterPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  const [tabs, setTabs] = useState<Tab[]>(INITIAL_TABS);
  const [activeTabId, setActiveTabId] = useState(
    DEFAULT_WRITER_SETTINGS.ACTIVE_TAB_ID
  );
  const [currentPage, setCurrentPage] = useState(
    DEFAULT_WRITER_SETTINGS.CURRENT_PAGE
  );
  const [totalPages, setTotalPages] = useState(
    DEFAULT_WRITER_SETTINGS.TOTAL_PAGES
  );
  const [credits, setCredits] = useState(DEFAULT_WRITER_SETTINGS.CREDITS);
  const [fontSize, setFontSize] = useState(DEFAULT_WRITER_SETTINGS.FONT_SIZE);
  const [characters, setCharacters] = useState<Character[]>(DEMO_CHARACTERS);
  const [panels, setPanels] = useState<Panel[]>(DEMO_PANELS);
  const [selectedStyle, setSelectedStyle] = useState<string>();
  const [showIllustratedComicBook, setShowIllustratedComicBook] = useState(
    DEFAULT_WRITER_SETTINGS.SHOW_ILLUSTRATED_COMIC_BOOK
  );
  const [comicBookWidth, setComicBookWidth] = useState(
    DEFAULT_WRITER_SETTINGS.COMIC_BOOK_WIDTH
  );

  // Auto-save indicator
  const [saveIndicator, setSaveIndicator] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/?signin=true");
        return;
      }
      setUser(user);
      setLoading(false);
    };

    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        router.push("/?signin=true");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [router, supabase]);

  const showSaveIndicator = () => {
    setSaveIndicator(true);
    setTimeout(() => setSaveIndicator(false), 2000);
  };

  const handleTabChange = (tabId: string) => {
    setActiveTabId(tabId);
    setTabs(tabs.map((tab) => ({ ...tab, isActive: tab.id === tabId })));
  };

  const handleTabClose = (tabId: string) => {
    if (tabs.length === 1) return; // Keep at least one tab

    const newTabs = tabs.filter((tab) => tab.id !== tabId);
    setTabs(newTabs);

    if (activeTabId === tabId) {
      setActiveTabId(newTabs[newTabs.length - 1].id);
    }
  };

  const handleNewComic = () => {
    const newTab: Tab = {
      id: generateId(),
      title: "New Comic",
      type: "standalone",
      comicId: generateId(),
    };
    setTabs([...tabs, newTab]);
    setActiveTabId(newTab.id);
  };

  const handleNextEpisode = () => {
    const newTab: Tab = {
      id: generateId(),
      title: "New Episode",
      type: "series_episode",
      comicId: generateId(),
    };
    setTabs([...tabs, newTab]);
    setActiveTabId(newTab.id);
  };

  const handlePanelUpdate = (panelId: string, updates: Partial<Panel>) => {
    setPanels(
      panels.map((panel) =>
        panel.id === panelId ? { ...panel, ...updates } : panel
      )
    );
    showSaveIndicator();
  };

  const handleAddPanel = () => {
    const newPanel: Panel = {
      id: generateId(),
      number: panels.length + 1,
      description: "",
      characters: [],
    };
    setPanels([...panels, newPanel]);
  };

  const handleAddPage = () => {
    setTotalPages(totalPages + 1);
    setCurrentPage(totalPages + 1);
  };

  const handleAddNarration = (panelId: string) => {
    handlePanelUpdate(panelId, { narration: "" });
  };

  const handleCharacterSelect = (character: Character) => {
    // Handle character selection logic
    console.log("Selected character:", character);
  };

  const handleAddCharacter = () => {
    // Open character creation modal
    console.log("Add character");
  };

  const handleStyleSelect = () => {
    // Open style selection modal
    console.log("Select style");
  };

  const handleIllustrate = () => {
    // Start illustration process
    console.log("Illustrate");
  };

  const handlePublish = () => {
    // Open publish modal
    console.log("Publish");
  };

  const handlePlotFlow = () => {
    // Open plot flow view
    console.log("Plot flow");
  };

  const handleViewOptionsChange = (options: any) => {
    if (options.showIllustratedComicBook !== undefined) {
      setShowIllustratedComicBook(options.showIllustratedComicBook);
    }
  };

  const handleComicBookResize = (width: number) => {
    setComicBookWidth(width);
  };

  const handleReillustrate = (panelId: string) => {
    const panel = panels.find((p) => p.id === panelId);
    if (panel) {
      console.log(`Re-illustrating Panel ${panel.number}:`, panel.description);
      showSaveIndicator();
    }
  };

  return (
    <div className="h-screen relative flex flex-col bg-vscode-editor text-white">
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          {/* Save Indicator  */}
          {saveIndicator && (
            <div className="fixed top-4 right-4 bg-yellow-500 text-black px-4 py-2 rounded-md font-semibold z-50 animate-fade-in">
              Saved
            </div>
          )}

          {/* Toolbar  */}
          <WriterToolbar
            currentPage={currentPage}
            totalPages={totalPages}
            credits={credits}
            onPageChange={setCurrentPage}
            onNewComic={handleNewComic}
            onNextEpisode={handleNextEpisode}
            onPlotFlow={handlePlotFlow}
            onFontSizeChange={setFontSize}
            onViewOptionsChange={handleViewOptionsChange}
          />

          {/* Tab System  */}
          <TabSystem
            tabs={tabs}
            activeTabId={activeTabId}
            onTabChange={handleTabChange}
            onTabClose={handleTabClose}
          />

          {/* Main Content  */}
          <div className="flex flex-1 overflow-hidden">
            {/* Character Sidebar */}
            <CharacterSidebar
              characters={characters}
              selectedStyle={selectedStyle}
              onCharacterSelect={handleCharacterSelect}
              onAddCharacter={handleAddCharacter}
              onStyleSelect={handleStyleSelect}
              onIllustrate={handleIllustrate}
              onPublish={handlePublish}
            />
            {/* Script Editor  */}
            <div
              className={`min-w-0 h-full flex flex-col ${
                showIllustratedComicBook ? "" : "flex-1"
              }`}
              style={{
                width: showIllustratedComicBook
                  ? `calc(100% - ${CHARACTER_SIDEBAR_WIDTH}px - ${comicBookWidth}px)`
                  : undefined,
              }}
            >
              <ScriptEditor
                panels={panels}
                characters={characters}
                currentPage={currentPage}
                fontSize={fontSize}
                onPanelUpdate={handlePanelUpdate}
                onAddPanel={handleAddPanel}
                onAddPage={handleAddPage}
                onAddNarration={handleAddNarration}
              />
            </div>
            {/* Illustrated Comic Book */}
            {showIllustratedComicBook && (
              <IllustratedComicBook
                panels={panels}
                currentPage={currentPage}
                width={comicBookWidth}
                onResize={handleComicBookResize}
                onReillustrate={handleReillustrate}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
