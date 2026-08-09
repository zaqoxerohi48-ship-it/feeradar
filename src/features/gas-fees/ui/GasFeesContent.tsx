import { Activity, ArrowUp, RefreshCw, ShieldCheck } from 'lucide-react'
import { formatGwei, formatWaitTime } from '../lib/formatGasFees'
import type { GasFees } from '../types/types'
import { FeeItem } from './FeeItem'
import { NetworkCongestionBar } from './NetworkCongestionBar'
import { NetworkMetric } from './NetworkMetric'

type GasFeesContentProps = {
  fees: GasFees
  isRefreshing: boolean
}

export const GasFeesContent = ({ fees, isRefreshing }: GasFeesContentProps) => {
  const congestionPercent = Math.round(fees.networkCongestion * 100)

  return (
    <section className="overflow-hidden rounded-2xl border bg-card p-6 text-card-foreground shadow-sm">
      <div className="relative">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold">Ethereum network fees</h2>
            <p className="text-sm text-muted-foreground">Live gas recommendations</p>
          </div>

          <div className="flex items-center gap-2 rounded-full border bg-muted px-3 py-2 text-xs text-muted-foreground">
            <RefreshCw className={`size-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            Updated every 30 sec
          </div>
        </div>

        <div className="mt-7 grid gap-3 md:grid-cols-3">
          <FeeItem label="Low" value={formatGwei(fees.low.suggestedMaxFeePerGas)} wait={formatWaitTime(fees.low)} />

          <FeeItem label="Medium" value={formatGwei(fees.medium.suggestedMaxFeePerGas)} wait={formatWaitTime(fees.medium)} active />

          <FeeItem label="High" value={formatGwei(fees.high.suggestedMaxFeePerGas)} wait={formatWaitTime(fees.high)} />
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <NetworkMetric icon={Activity} label="Network load" value={`${congestionPercent}%`} />

          <NetworkMetric icon={ShieldCheck} label="Base fee" value={`${formatGwei(fees.estimatedBaseFee)} Gwei`} />

          <NetworkMetric icon={ArrowUp} label="Base fee trend" value={fees.baseFeeTrend} />
        </div>

        <NetworkCongestionBar congestionPercent={congestionPercent} />
      </div>
    </section>
  )
}
