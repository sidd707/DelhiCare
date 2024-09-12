"use client";

import { Area, AreaChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export default function TotalProducts() {
  return (
    <Card className="w-full h-full bg-indigo-50/5">
      <CardHeader className="space-y-0 pb-0">
        <CardDescription>Total Products</CardDescription>
        <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
          9840
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 h-[300px]"> {/* Adjusted height to 300px */}
        <ChartContainer
          config={{
            products: {
              label: "Products",
              color: "#dc2626", // Adjust color as per your preference
            },
          }}
          className="w-full h-full"
        >
          <AreaChart 
            width={400}  // Set width to fit the content area
            height={250} // Adjusted height to 250px
            data={[
              {
                date: "2024-01-01",
                products: 9500,
              },
              {
                date: "2024-01-02",
                products: 7000,
              },
              {
                date: "2024-01-03",
                products: 9000,
              },
              {
                date: "2024-01-04",
                products: 8000,
              },
              {
                date: "2024-01-05",
                products: 7000,
              },
              {
                date: "2024-01-06",
                products: 8000,
              },
              {
                date: "2024-01-07",
                products: 8950,
              },
            ]}
            margin={{
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            }}
          >
            <XAxis dataKey="date" hide />
            <YAxis domain={["dataMin - 100", "dataMax + 100"]} hide />
            <defs>
              <linearGradient id="fillProducts" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-products)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-products)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="products"
              type="natural"
              fill="url(#fillProducts)"
              fillOpacity={0.4}
              stroke="var(--color-products)"
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
              formatter={(value) => (
                <div className="flex min-w-[120px] items-center text-xs text-muted-foreground">
                  Total Products
                  <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                    {value}
                    <span className="font-normal text-muted-foreground">
                      units
                    </span>
                  </div>
                </div>
              )}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}