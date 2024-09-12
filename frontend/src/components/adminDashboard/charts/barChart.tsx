"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


const chartConfig = {
  availableBeds: {
    label: "Available Beds",
    color: "hsl(var(--chart-1))",
  },
  totalBeds: {
    label: "Total Beds",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function Barchart({chartData}:any) {
  return (
    <Card >
      <CardHeader>
        <CardTitle>Bed Allotment - General , ICU , Emergency</CardTitle>
        <CardDescription>Total wards bed occupied</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="department"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="availableBeds" fill="#2563eb" radius={4} />
            <Bar dataKey="totalBeds" fill="#60a5fa" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
      <div className="flex gap-2 font-medium leading-none">
         Bed allotment up by 5.2% today <TrendingUp className="h-4 w-4" />
      </div>
      <div className="leading-none text-muted-foreground">
        Showing daily bed allocation and availability for ICU, Emergency, and General wards.
      </div>

      </CardFooter>
    </Card>
  )
}
