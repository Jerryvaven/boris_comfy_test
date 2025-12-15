"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown, Plus, FileText, Image as ImageIcon, Type, Eye, Settings, User, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalTitle, 
  ModalTrigger 
} from '@/components/ui/modal'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

interface WriterToolbarProps {
  currentPage: number
  totalPages: number
  credits: number
  onPageChange: (page: number) => void
  onNewComic: () => void
  onNextEpisode: () => void
  onPlotFlow: () => void
  onFontSizeChange: (size: string) => void
  onViewOptionsChange: (options: any) => void
}

export function WriterToolbar({
  currentPage,
  totalPages,
  credits,
  onPageChange,
  onNewComic,
  onNextEpisode,
  onPlotFlow,
  onFontSizeChange,
  onViewOptionsChange
}: WriterToolbarProps) {
  const [showNewComicDropdown, setShowNewComicDropdown] = useState(false)
  const [showPageDropdown, setShowPageDropdown] = useState(false)
  const [showFontDropdown, setShowFontDropdown] = useState(false)
  const [showViewDropdown, setShowViewDropdown] = useState(false)
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)

  const supabase = createClient()
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const fontSizes = [
    { label: 'Small', value: '0.9rem' },
    { label: 'Medium', value: '1.0rem' },
    { label: 'Large (Default)', value: '1.1rem' },
    { label: 'XL', value: '1.3rem' },
  ]

  return (
    <div className="bg-gray-950 border-b border-gray-700 px-2 py-4 flex items-center justify-between h-[90px] sticky top-0 z-50">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center">
          <Image
            src="/assets/Images/inktron-logo.svg"
            alt="Inktron Comics"
            width={200}
            height={50}
            className="h-12 w-auto"
            priority
          />
        </Link>
        
        {/* New Comic Dropdown */}
        <div className="relative">
          <Button
            variant="toolbar"
            onClick={() => setShowNewComicDropdown(!showNewComicDropdown)}
            className="gap-1"
          >
            New Comic <ChevronDown className="h-4 w-4" />
          </Button>
          {showNewComicDropdown && (
            <div className="absolute top-full left-0 mt-2 bg-gray-800 border border-gray-600 rounded-md shadow-lg z-50 min-w-48">
              <button
                onClick={() => {
                  onNewComic()
                  setShowNewComicDropdown(false)
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-700 text-white"
              >
                Start New Comic
              </button>
              <button
                onClick={() => {
                  onNextEpisode()
                  setShowNewComicDropdown(false)
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-700 text-white"
              >
                Next Episode in Series
              </button>
            </div>
          )}
        </div>
        
        {/* Page Navigation */}
        <div className="flex items-center gap-1">
          <Button
            variant="toolbar"
            size="icon"
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage <= 1}
          >
            ◀
          </Button>
          
          <div className="relative">
            <Button
              variant="toolbar"
              onClick={() => setShowPageDropdown(!showPageDropdown)}
              className="gap-1"
            >
              Page {currentPage} <ChevronDown className="h-4 w-4" />
            </Button>
            {showPageDropdown && (
              <div className="absolute top-full left-0 mt-2 bg-gray-800 border border-gray-600 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => {
                      onPageChange(page)
                      setShowPageDropdown(false)
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-700 text-white ${
                      page === currentPage ? 'bg-gray-700' : ''
                    }`}
                  >
                    Page {page}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <Button
            variant="toolbar"
            size="icon"
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage >= totalPages}
          >
            ▶
          </Button>
        </div>
        
        <Button variant="toolbar" onClick={onPlotFlow}>
          Plot Flow
        </Button>
        
        {/* Font Size Dropdown */}
        <div className="relative">
          <Button
            variant="toolbar"
            onClick={() => setShowFontDropdown(!showFontDropdown)}
            className="gap-1"
          >
            <Type className="h-4 w-4" />
            Font Size <ChevronDown className="h-4 w-4" />
          </Button>
          {showFontDropdown && (
            <div className="absolute top-full left-0 mt-2 bg-gray-800 border border-gray-600 rounded-md shadow-lg z-50 min-w-48">
              {fontSizes.map((size) => (
                <button
                  key={size.value}
                  onClick={() => {
                    onFontSizeChange(size.value)
                    setShowFontDropdown(false)
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-700 text-white"
                >
                  {size.label}
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* View Options Dropdown */}
        <div className="relative">
          <Button
            variant="toolbar"
            onClick={() => setShowViewDropdown(!showViewDropdown)}
            className="gap-1"
          >
            <Eye className="h-4 w-4" />
            View Options <ChevronDown className="h-4 w-4" />
          </Button>
          {showViewDropdown && (
            <div className="absolute top-full left-0 mt-2 bg-gray-800 border border-gray-600 rounded-md shadow-lg z-50 min-w-64 p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-white text-sm">Quick Menu On/Off</label>
                  <input type="checkbox" className="toggle" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-white text-sm">Show Illustrated Comic Book</label>
                  <input type="checkbox" className="toggle" />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-white text-sm">Light Mode / Dark Mode</label>
                  <input type="checkbox" className="toggle" defaultChecked />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3 mr-2">
        <span className="text-white text-sm">
          Credits: <span className="text-yellow-500 font-semibold">{credits}</span>
        </span>
        
        <Button variant="primary" className="gap-2">
          <CreditCard className="h-4 w-4" />
          Upgrade to Pro
        </Button>
        
        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
          >
            <User className="h-5 w-5 text-white" />
          </button>
          {showProfileDropdown && (
            <div className="absolute top-full right-0 mt-2 bg-gray-800 border border-gray-600 rounded-md shadow-lg z-50 min-w-48">
              <Link href="/projects" className="block px-4 py-2 hover:bg-gray-700 text-white">
                My Projects
              </Link>
              <Link href="/shop" className="block px-4 py-2 hover:bg-gray-700 text-white">
                My Shop
              </Link>
              <Link href="/avatar" className="block px-4 py-2 hover:bg-gray-700 text-white">
                Create Avatar
              </Link>
              <Link href="/settings" className="block px-4 py-2 hover:bg-gray-700 text-white">
                Account Settings
              </Link>
              <hr className="border-gray-600 my-1" />
              <button
                onClick={handleSignOut}
                className="block w-full text-left px-4 py-2 hover:bg-gray-700 text-white"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}