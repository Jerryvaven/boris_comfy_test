import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

export default function MissionPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <main className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Mission
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Democratizing comic creation through the power of artificial intelligence
            </p>
          </div>

          <div className="prose prose-invert max-w-none">
            <div className="bg-gray-900 rounded-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-yellow-500 mb-4">
                Empowering Storytellers
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                At Inktron Comics, we believe that everyone has a story to tell. Our mission is to break down the barriers that have traditionally prevented people from creating professional-quality comics.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Whether you're a seasoned writer, an aspiring artist, or someone with a great idea but no drawing skills, our AI-powered platform gives you the tools to bring your vision to life.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gray-900 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">
                  Accessibility First
                </h3>
                <p className="text-gray-300">
                  We're making comic creation accessible to everyone, regardless of artistic ability or technical expertise.
                </p>
              </div>
              
              <div className="bg-gray-900 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">
                  Quality & Speed
                </h3>
                <p className="text-gray-300">
                  Create professional-quality comics in minutes, not months, without compromising on artistic vision.
                </p>
              </div>
              
              <div className="bg-gray-900 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">
                  Community Driven
                </h3>
                <p className="text-gray-300">
                  Build a thriving community of creators who support and inspire each other.
                </p>
              </div>
              
              <div className="bg-gray-900 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">
                  Creator Economy
                </h3>
                <p className="text-gray-300">
                  Enable creators to monetize their work and build sustainable creative careers.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl p-8 border border-yellow-500/20">
              <h2 className="text-2xl font-bold text-white mb-4">
                The Future of Comics
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We envision a world where the only limit to comic creation is imagination. By combining cutting-edge AI technology with intuitive design, we're not just creating a tool – we're fostering a new era of digital storytelling.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Join us in revolutionizing how stories are told, shared, and experienced in the digital age.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}