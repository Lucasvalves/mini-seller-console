import { TrendingUp } from 'lucide-react'

export default function MiniSellerConsole() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Mini Seller Console
                </h1>
                <p className="text-sm text-gray-600">
                  Manage leads and opportunities
                </p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">4</div>
                <div className="text-xs text-gray-600">Active Leads</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">9</div>
                <div className="text-xs text-gray-600">Opportunities</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">2</div>
                <div className="text-xs text-gray-600">Qualified</div>
              </div>
            </div>
          </div>
        </div>
      </header>

    </div>
  )
}
