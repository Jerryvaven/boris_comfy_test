"use client";

import React, { useState, useRef, useEffect } from "react";
import { Plus, FileText, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Panel, Character } from "@/types";
import { cn } from "@/lib/utils";

interface ScriptEditorProps {
  panels: Panel[];
  characters: Character[];
  currentPage: number;
  fontSize: string;
  onPanelUpdate: (panelId: string, updates: Partial<Panel>) => void;
  onAddPanel: () => void;
  onAddPage: () => void;
  onAddNarration: (panelId: string) => void;
}

export function ScriptEditor({
  panels,
  characters,
  currentPage,
  fontSize,
  onPanelUpdate,
  onAddPanel,
  onAddPage,
  onAddNarration,
}: ScriptEditorProps) {
  const [editingPanel, setEditingPanel] = useState<string | null>(null);
  const [draggedPanel, setDraggedPanel] = useState<string | null>(null);

  const handlePanelDescriptionChange = (
    panelId: string,
    description: string
  ) => {
    onPanelUpdate(panelId, { description });
  };

  const handleCharacterDialogueChange = (
    panelId: string,
    characterIndex: number,
    field: "action" | "dialogue" | "emotion",
    value: string
  ) => {
    const panel = panels.find((p) => p.id === panelId);
    if (!panel) return;

    const updatedCharacters = [...panel.characters];
    updatedCharacters[characterIndex] = {
      ...updatedCharacters[characterIndex],
      [field]: value,
    };

    onPanelUpdate(panelId, { characters: updatedCharacters });
  };

  const addCharacterToPanel = (panelId: string, character: Character) => {
    const panel = panels.find((p) => p.id === panelId);
    if (!panel) return;

    const newCharacterDialogue = {
      characterId: character.id,
      characterName: character.name,
      action: "",
      dialogue: "",
    };

    onPanelUpdate(panelId, {
      characters: [...panel.characters, newCharacterDialogue],
    });
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-vscode-editor">
      {/* Page Header */}
      <div className="sticky top-0 bg-vscode-sidebar border-b-2 border-vscode p-4 ">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onAddPanel}
              className="gap-1"
            >
              <FileText className="h-4 w-4" />
              Panel
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onAddPage}
              className="gap-1"
            >
              <Plus className="h-4 w-4" />
              Page
            </Button>
          </div>

          <h2 className="text-yellow-500 font-semibold text-lg">
            PAGE {currentPage} [PANELS: {panels.length}]
          </h2>
        </div>
      </div>

      {/* Script Content */}
      <div
        className="flex-1 overflow-y-auto p-8 w-full"
        style={{ fontSize }}
      >
        <div className="space-y-6">
          {panels.map((panel, index) => (
            <div
              key={panel.id}
              className={cn(
                "transition-all duration-200",
                draggedPanel === panel.id && "opacity-50 scale-95",
                editingPanel === panel.id && "ring-2 ring-yellow-500/50"
              )}
            >
              {/* Panel Header */}
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="text-yellow-500 font-bold cursor-move hover:text-orange-500 transition-colors select-none"
                  draggable
                  onDragStart={() => setDraggedPanel(panel.id)}
                  onDragEnd={() => setDraggedPanel(null)}
                >
                  PANEL {panel.number}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <textarea
                      value={panel.description}
                      onChange={(e) =>
                        handlePanelDescriptionChange(panel.id, e.target.value)
                      }
                      onFocus={() => setEditingPanel(panel.id)}
                      onBlur={() => setEditingPanel(null)}
                      className="flex-1 bg-transparent border-none outline-none text-white resize-none leading-relaxed"
                      placeholder="Describe what happens in this panel..."
                      rows={2}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onAddNarration(panel.id)}
                      className="gap-1 text-xs"
                    >
                      <Volume2 className="h-3 w-3" />
                      SFX
                    </Button>
                  </div>
                </div>
              </div>

              {/* Character Dialogues */}
              <div className="space-y-4 ml-16">
                {panel.characters.map((charDialogue, charIndex) => (
                  <div key={`${panel.id}-${charIndex}`} className="space-y-2">
                    {/* Character Name */}
                    <div className="text-center">
                      <div className="text-white font-bold uppercase text-center w-2/5 mx-auto">
                        {charDialogue.characterName}
                      </div>
                    </div>

                    {/* Character Action */}
                    {charDialogue.action && (
                      <div className="text-center">
                        <textarea
                          value={charDialogue.action}
                          onChange={(e) =>
                            handleCharacterDialogueChange(
                              panel.id,
                              charIndex,
                              "action",
                              e.target.value
                            )
                          }
                          className="w-4/5 mx-auto bg-transparent border-none outline-none text-gray-400 italic text-center resize-none"
                          placeholder="(Character action or emotion)"
                          rows={1}
                        />
                      </div>
                    )}

                    {/* Dialogue */}
                    {charDialogue.dialogue && (
                      <div className="text-center">
                        <textarea
                          value={charDialogue.dialogue}
                          onChange={(e) =>
                            handleCharacterDialogueChange(
                              panel.id,
                              charIndex,
                              "dialogue",
                              e.target.value
                            )
                          }
                          className="w-3/5 mx-auto bg-transparent border-none outline-none text-white font-bold text-center resize-none"
                          placeholder="Character dialogue..."
                          rows={1}
                        />
                      </div>
                    )}
                  </div>
                ))}

                {/* Add Character Button */}
                <div className="flex justify-center">
                  <select
                    onChange={(e) => {
                      const character = characters.find(
                        (c) => c.id === e.target.value
                      );
                      if (character) {
                        addCharacterToPanel(panel.id, character);
                        e.target.value = "";
                      }
                    }}
                    className="bg-vscode-active border border-vscode rounded px-3 py-1 text-sm text-white"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Add Character...
                    </option>
                    {characters.map((character) => (
                      <option key={character.id} value={character.id}>
                        {character.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Narration */}
              {panel.narration && (
                <div className="ml-16 mt-4">
                  <textarea
                    value={panel.narration}
                    onChange={(e) =>
                      onPanelUpdate(panel.id, { narration: e.target.value })
                    }
                    className="w-1/2 mx-auto bg-transparent border-none outline-none text-gray-300 italic text-left resize-none"
                    placeholder="Narration text..."
                    rows={2}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
