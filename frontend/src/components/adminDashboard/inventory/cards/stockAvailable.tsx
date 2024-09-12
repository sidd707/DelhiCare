"use client"

import * as React from "react"

import { Label, Pie, PieChart, Cell } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
 
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A donut chart with text"

const chartData = [
  { category: "Medicines", stock: 850 },
  { category: "Consumables", stock: 670 },
  { category: "Equipment", stock: 320 },
]

const chartConfig = {
  medicines: {
    label: "Medicines",
    color: "hsl(var(--chart-1))",
  },
  consumables: {
    label: "Consumables",
    color: "hsl(var(--chart-2))",
  },
  equipment: {
    label: "Equipment",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

export default function StockOverviewComponent() {
  const totalStock = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.stock, 0)
  }, [])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Stock Overview</CardTitle>
        <CardDescription>Current Inventory Levels</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="stock"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalStock.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total Stock
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={chartConfig[entry.category.toLowerCase() as keyof typeof chartConfig]?.color || "#000"}
                />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
