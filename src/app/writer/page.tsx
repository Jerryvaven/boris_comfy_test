"use client"

import React, { useState, useEffect } from 'react'
import { WriterToolbar } from '@/components/features/writer/writer-toolbar'
import { TabSystem } from '@/components/features/writer/tab-system'
import { CharacterSidebar } from '@/components/features/writer/character-sidebar'
import { ScriptEditor } from '@/components/features/writer/script-editor'
import { Tab, Comic, Character, Panel } from '@/types'
import { generateId } from '@/lib/utils'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

// Demo data
const demoCharacters: Character[] = [
  {
    id: 'leaf-guy',
    name: 'Leaf Guy',
    gender: 'Plant-Human',
    age: 52,
    description: 'He is a plant that woke up as a human and has been battling Dr. Strombizoid for eons.',
    avatar: '/assets/Images/character-leaf.svg'
  },
  {
    id: 'mechanical-guy',
    name: 'Mechanical Guy',
    gender: 'Cyborg',
    age: 999,
    description: 'He is a cyborg from planet Borgranarden. He watches over life.',
    avatar: '/assets/Images/character-mech.svg'
  },
  {
    id: 'evil-guy',
    name: 'Evil Guy',
    gender: 'Alien',
    age: 86,
    description: 'From planet Evil Fart. He is set to turn the planets to gas giants to feed his ego-maniacal dream of ruling gas.',
    avatar: '/assets/Images/character-evil.svg'
  }
]

const demoPanels: Panel[] = [
  {
    id: 'panel-1',
    number: 1,
    description: 'A bright sunny day. The Brooklyn Bridge is cracking down the middle. Cars are bumper to bumper. The people inside are terrified.',
    characters: [
      {
        characterId: 'leaf-guy',
        characterName: 'Leaf Guy',
        action: '(Leaf Guy emerges from the forest, vines swirling around him. He\'s ready to protect nature from the evil forces.)',
        dialogue: 'The forest calls, and I answer!'
      },
      {
        characterId: 'mechanical-guy',
        characterName: 'Mechanical Guy',
        action: '(Mechanical Guy activates his tech suit, gears whirring and lights blinking as he prepares for action)',
        dialogue: ''
      }
    ]
  },
  {
    id: 'panel-2',
    number: 2,
    description: 'A bright shining moon over a dusty field. Twilight where we see both the rising moon and setting sun.',
    characters: []
  },
  {
    id: 'panel-3',
    number: 3,
    description: 'A dark lair overlooking the city. Evil Guy watches the chaos unfold from his control room filled with monitors.',
    characters: [
      {
        characterId: 'evil-guy',
        characterName: 'Evil Guy',
        action: '(Evil Guy laughs maniacally, stroking his chin as he watches the heroes struggle on his monitors.)',
        dialogue: 'Excellent! Let\'s see how they handle my next surprise!'
      }
    ]
  }
]

export default function WriterPage() {
 const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  const [tabs, setTabs] = useState<Tab[]>([
    {
      id: 'tab1',
      title: 'Brooklyn Fun',
      type: 'standalone',
      comicId: 'brooklyn-fun',
      isActive: true
    }
  ])
  
  const [activeTabId, setActiveTabId] = useState('tab1')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(8)
  const [credits, setCredits] = useState(100)
  const [fontSize, setFontSize] = useState('1.1rem')
  const [characters, setCharacters] = useState<Character[]>(demoCharacters)
  const [panels, setPanels] = useState<Panel[]>(demoPanels)
  const [selectedStyle, setSelectedStyle] = useState<string>()

  // Auto-save indicator
  const [saveIndicator, setSaveIndicator] = useState(false)

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/?signin=true')
        return
      }
      setUser(user)
      setLoading(false)
    }

    checkUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        router.push('/?signin=true')
      } else {
        setUser(session.user)
      }
    })

    return () => subscription.unsubscribe()
  }, [router, supabase])

  const showSaveIndicator = () => {
    setSaveIndicator(true)
    setTimeout(() => setSaveIndicator(false), 2000)
  }

  const handleTabChange = (tabId: string) => {
    setActiveTabId(tabId)
    setTabs(tabs.map(tab => ({ ...tab, isActive: tab.id === tabId })))
  }

  const handleTabClose = (tabId: string) => {
    if (tabs.length === 1) return // Keep at least one tab
    
    const newTabs = tabs.filter(tab => tab.id !== tabId)
    setTabs(newTabs)
    
    if (activeTabId === tabId) {
      setActiveTabId(newTabs[newTabs.length - 1].id)
    }
  }

  const handleNewComic = () => {
    const newTab: Tab = {
      id: generateId(),
      title: 'New Comic',
      type: 'standalone',
      comicId: generateId()
    }
    setTabs([...tabs, newTab])
    setActiveTabId(newTab.id)
  }

  const handleNextEpisode = () => {
    const newTab: Tab = {
      id: generateId(),
      title: 'New Episode',
      type: 'series_episode',
      comicId: generateId()
    }
    setTabs([...tabs, newTab])
    setActiveTabId(newTab.id)
  }

  const handlePanelUpdate = (panelId: string, updates: Partial<Panel>) => {
    setPanels(panels.map(panel => 
      panel.id === panelId ? { ...panel, ...updates } : panel
    ))
    showSaveIndicator()
  }

  const handleAddPanel = () => {
    const newPanel: Panel = {
      id: generateId(),
      number: panels.length + 1,
      description: '',
      characters: []
    }
    setPanels([...panels, newPanel])
  }

  const handleAddPage = () => {
    setTotalPages(totalPages + 1)
    setCurrentPage(totalPages + 1)
  }

  const handleAddNarration = (panelId: string) => {
    handlePanelUpdate(panelId, { narration: '' })
  }

  const handleCharacterSelect = (character: Character) => {
    // Handle character selection logic
    console.log('Selected character:', character)
  }

  const handleAddCharacter = () => {
    // Open character creation modal
    console.log('Add character')
  }

  const handleStyleSelect = () => {
    // Open style selection modal
    console.log('Select style')
  }

  const handleIllustrate = () => {
    // Start illustration process
    console.log('Illustrate')
  }

  const handlePublish = () => {
    // Open publish modal
    console.log('Publish')
  }

  const handlePlotFlow = () => {
    // Open plot flow view
    console.log('Plot flow')
  }

  return (
    <div className="h-screen flex flex-col bg-gray-950 text-white">
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      ) : (
        <>
          {/* Save Indicator */}
          {saveIndicator && (
            <div className="fixed top-4 right-4 bg-yellow-500 text-gray-900 px-4 py-2 rounded-md font-semibold z-50 animate-fade-in">
              Saved
            </div>
          )}

          {/* Toolbar */}
          <WriterToolbar
            currentPage={currentPage}
            totalPages={totalPages}
            credits={credits}
            onPageChange={setCurrentPage}
            onNewComic={handleNewComic}
            onNextEpisode={handleNextEpisode}
            onPlotFlow={handlePlotFlow}
            onFontSizeChange={setFontSize}
            onViewOptionsChange={() => {}}
          />

          {/* Tab System */}
          <TabSystem
            tabs={tabs}
            activeTabId={activeTabId}
            onTabChange={handleTabChange}
            onTabClose={handleTabClose}
          />

          {/* Main Content */}
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

            {/* Script Editor */}
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
        </>
      )}
    </div>
  )
}