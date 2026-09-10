'use client'

import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

type ActivityChartItem = {
  date: string
  users: number
  orders: number
}

const chartConfig = {
  users: {
    label: 'Users',
    color: 'var(--chart-1)'
  },
  orders: {
    label: 'Orders',
    color: 'var(--chart-2)'
  }
} satisfies ChartConfig

export function ActivityChart({ data }: { data: ActivityChartItem[] }) {
  const users = data.reduce((total, item) => total + item.users, 0)
  const orders = data.reduce((total, item) => total + item.orders, 0)

  return (
    <Card className="shadow-sm">
      <CardHeader className="border-b">
        <CardTitle>Weekly activity</CardTitle>
        <CardDescription>New customers and orders across the last seven days.</CardDescription>
        <div className="mt-3 flex items-center gap-5 text-xs">
          <div>
            <p className="text-muted-foreground">New users</p>
            <p className="mt-1 text-lg font-semibold tabular-nums">{users}</p>
          </div>
          <div className="border-l pl-5">
            <p className="text-muted-foreground">New orders</p>
            <p className="mt-1 text-lg font-semibold tabular-nums">{orders}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-5">
        <ChartContainer config={chartConfig} className="h-64 w-full sm:h-72">
          <BarChart accessibilityLayer data={data} margin={{ top: 8, left: -18, right: 4 }} barGap={5}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={10} />
            <YAxis allowDecimals={false} tickLine={false} axisLine={false} tickMargin={10} width={24} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend iconSize={8} wrapperStyle={{ paddingTop: 16, fontSize: 12 }} />
            <Bar dataKey="users" fill="var(--color-users)" radius={[5, 5, 0, 0]} maxBarSize={34} />
            <Bar dataKey="orders" fill="var(--color-orders)" radius={[5, 5, 0, 0]} maxBarSize={34} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
