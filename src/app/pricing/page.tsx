import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for trying out comic creation",
    features: [
      "100 monthly credits",
      "8 art styles",
      "Basic character creation",
      "PDF export",
      "Community access"
    ],
    cta: "Get Started",
    popular: false
  },
  {
    name: "Reader",
    price: "$9.99",
    period: "per month",
    description: "For comic enthusiasts and casual creators",
    features: [
      "Unlimited reading access",
      "Download for offline",
      "Early access to new comics",
      "Ad-free experience",
      "Premium support"
    ],
    cta: "Subscribe",
    popular: false
  },
  {
    name: "Reader Plus",
    price: "$14.99",
    period: "per month",
    description: "Enhanced reading with creation benefits",
    features: [
      "Everything in Reader",
      "Print-ready PDFs",
      "Exclusive comic variants",
      "Behind-the-scenes content",
      "Creator interviews"
    ],
    cta: "Subscribe",
    popular: true
  },
  {
    name: "Pro Creator",
    price: "$29.99",
    period: "per month",
    description: "For serious comic creators and professionals",
    features: [
      "Unlimited credits",
      "All 18 art styles",
      "Advanced character editor",
      "Collaboration tools",
      "Priority processing",
      "Commercial licensing",
      "Analytics dashboard"
    ],
    cta: "Go Pro",
    popular: false
  }
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <main className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Choose Your Plan
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Start creating amazing comics today. Upgrade anytime as your needs grow.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-gray-900 rounded-xl p-6 border ${
                  plan.popular 
                    ? 'border-yellow-500 ring-2 ring-yellow-500/20' 
                    : 'border-gray-800'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-yellow-500 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-2">
                    <span className="text-3xl font-bold text-white">
                      {plan.price}
                    </span>
                    <span className="text-gray-400 ml-1">
                      {plan.period}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.popular ? "primary" : "outline"}
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Pricing FAQ
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Can I change plans anytime?
                </h3>
                <p className="text-gray-300 text-sm">
                  Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  What happens to my comics if I downgrade?
                </h3>
                <p className="text-gray-300 text-sm">
                  Your comics remain yours forever. You'll just lose access to premium features and styles.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Do you offer refunds?
                </h3>
                <p className="text-gray-300 text-sm">
                  We offer a 30-day money-back guarantee for all paid plans. No questions asked.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Is there a student discount?
                </h3>
                <p className="text-gray-300 text-sm">
                  Yes! Students get 50% off Pro Creator plans with valid student ID verification.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}