'use client'

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
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
  return (
    <Card>
      <CardHeader>
        <CardTitle>Platform activity</CardTitle>
        <CardDescription>New users and orders from the last 7 days.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-72 w-full">
          <BarChart accessibilityLayer data={data} margin={{ left: -24, right: 8 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={10} />
            <YAxis tickLine={false} axisLine={false} tickMargin={10} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="users" fill="var(--color-users)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="orders" fill="var(--color-orders)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
