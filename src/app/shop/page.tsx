import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <main className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-8">Comic Shop</h1>
          <p className="text-gray-400 mb-8">
            Discover amazing comics created by our community of artists and writers.
          </p>
          
          {/* Placeholder for shop content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="aspect-[3/4] bg-gray-700 rounded mb-4"></div>
                <h3 className="text-white font-semibold mb-2">Comic Title {i + 1}</h3>
                <p className="text-gray-400 text-sm mb-2">by Author Name</p>
                <div className="flex items-center justify-between">
                  <span className="text-yellow-500 font-bold">$9.99</span>
                  <button className="bg-yellow-500 text-gray-900 px-3 py-1 rounded text-sm font-semibold hover:bg-yellow-600 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}