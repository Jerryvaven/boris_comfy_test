import React from 'react'
import Link from 'next/link'
import { Facebook, Twitter, Github } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-black border-t border-yellow-500/30 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <p className="text-gray-300">
              Create amazing comics with AI-powered tools and intuitive design.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/writer" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Templates
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Examples
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link href="/mission" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/mission" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/mission" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 mt-8 border-t border-yellow-500/30">
          <p className="text-gray-300 text-sm">
            © 2025 Inktron Comics. All rights reserved.
          </p>
          
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Link 
              href="#" 
              className="text-gray-300 hover:text-yellow-500 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </Link>
            <Link 
              href="#" 
              className="text-gray-300 hover:text-yellow-500 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </Link>
            <Link 
              href="#" 
              className="text-gray-300 hover:text-yellow-500 transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}