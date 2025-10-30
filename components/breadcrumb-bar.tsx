'use client'

import { BreadcrumbSchema, BreadcrumbItem } from '@/components/breadcrumb-schema'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { useEffect, useState } from 'react'

interface BreadcrumbBarProps {
  items: BreadcrumbItem[]
}

interface TickerItem {
  symbol: string
  name: string
  price: number
  change: number
}

export function BreadcrumbBar({ items }: BreadcrumbBarProps) {
  const [tickers, setTickers] = useState<TickerItem[]>([
    { symbol: 'BTC', name: 'Bitcoin', price: 0, change: 0 },
    { symbol: 'ETH', name: 'Ethereum', price: 0, change: 0 },
    { symbol: 'BNB', name: 'Binance Coin', price: 0, change: 0 },
    { symbol: 'SOL', name: 'Solana', price: 0, change: 0 },
    { symbol: 'XRP', name: 'Ripple', price: 0, change: 0 },
    { symbol: 'ADA', name: 'Cardano', price: 0, change: 0 },
  ])

  // Fetch real crypto prices from CoinGecko API
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin,solana,ripple,cardano&vs_currencies=usd&include_24hr_change=true'
        )
        const data = await response.json()
        
        setTickers([
          { symbol: 'BTC', name: 'Bitcoin', price: data.bitcoin?.usd || 0, change: data.bitcoin?.usd_24h_change || 0 },
          { symbol: 'ETH', name: 'Ethereum', price: data.ethereum?.usd || 0, change: data.ethereum?.usd_24h_change || 0 },
          { symbol: 'BNB', name: 'Binance Coin', price: data.binancecoin?.usd || 0, change: data.binancecoin?.usd_24h_change || 0 },
          { symbol: 'SOL', name: 'Solana', price: data.solana?.usd || 0, change: data.solana?.usd_24h_change || 0 },
          { symbol: 'XRP', name: 'Ripple', price: data.ripple?.usd || 0, change: data.ripple?.usd_24h_change || 0 },
          { symbol: 'ADA', name: 'Cardano', price: data.cardano?.usd || 0, change: data.cardano?.usd_24h_change || 0 },
        ])
      } catch (error) {
        console.error('Error fetching crypto prices:', error)
      }
    }

    fetchPrices()
    const interval = setInterval(fetchPrices, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed top-16 left-0 right-0 z-40 bg-black/80 backdrop-blur-md border-b border-blue-500/20 shadow-lg">
      <div className="container mx-auto px-4 md:px-6 py-2 md:py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Breadcrumbs */}
          <div className="flex-shrink-0">
            <BreadcrumbSchema items={items} />
          </div>

          {/* Right: Live Ticker */}
          <div className="flex-1 overflow-hidden">
            <div className="ticker-wrapper">
              <div className="ticker-content">
                {[...tickers, ...tickers, ...tickers].map((ticker, index) => (
                  <div
                    key={`${ticker.symbol}-${index}`}
                    className="ticker-item"
                  >
                    <span className="font-semibold text-gray-300">{ticker.symbol}</span>
                    <span className="text-white font-mono">
                      ${ticker.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <span className={`flex items-center gap-0.5 ${ticker.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {ticker.change >= 0 ? (
                        <TrendingUp className="w-2.5 h-2.5" />
                      ) : (
                        <TrendingDown className="w-2.5 h-2.5" />
                      )}
                      {Math.abs(ticker.change).toFixed(2)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .ticker-wrapper {
          overflow: hidden;
          position: relative;
        }

        .ticker-content {
          display: flex;
          gap: 1.5rem;
          animation: scroll 40s linear infinite;
          will-change: transform;
        }

        .ticker-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 10px;
          white-space: nowrap;
          flex-shrink: 0;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .ticker-content:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}
