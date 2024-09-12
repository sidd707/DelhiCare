"use client";


import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";

interface StockData {
  status: string;
  current: number;
  total: number;
}

export default function StockRadial() {
  // Placeholder data, replace with fetched data later
  const data: StockData[] = [
    { status: "In Stock", current: 562, total: 600 },
    { status: "Low Stock", current: 73, total: 120 },
    { status: "Out of Stock", current: 8, total: 12 },
  ];

  const chartData = [
    { status: "In Stock", value: (562 / 600) * 100, fill: "#0d9488" }, // Hardcoded color
    { status: "Low Stock", value: (73 / 120) * 100, fill: "#334155" }, // Hardcoded color
    { status: "Out of Stock", value: (8 / 12) * 100, fill: "#ea580c" }, // Hardcoded color
  ];

  return (
    <Card className="w-full h-full"> {/* Updated to use full width and height */}
      <CardContent className="flex gap-4 p-4 h-full"> {/* Ensure the content covers full height */}
        <div className="grid items-center gap-2">
          {data.map(item => (
            <div key={item.status} className="grid flex-1 auto-rows-min gap-0.5">
              <div className="text-sm text-muted-foreground">{item.status}</div>
              <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                {item.current}/{item.total}
                <span className="text-sm font-normal text-muted-foreground">
                  units
                </span>
              </div>
            </div>
          ))}
        </div>
        <ChartContainer
          config={{
            inStock: {
              label: "In Stock",
              color: "#1f77b4", // Hardcoded color
            },
            lowStock: {
              label: "Low Stock",
              color: "#ff7f0e", // Hardcoded color
            },
            outOfStock: {
              label: "Out of Stock",
              color: "#d62728", // Hardcoded color
            },
          }}
          className="flex-grow aspect-square w-full" // Adjusted to cover full div
        >
          <RadialBarChart
            margin={{
              left: -10,
              right: -10,
              top: -10,
              bottom: -10,
            }}
            data={chartData}
            innerRadius="20%"
            barSize={24}
            startAngle={90}
            endAngle={450}
            width={250} // Optional: Adjust width if needed
            height={250} // Optional: Adjust height if needed
          >
            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              dataKey="value"
              tick={false}
            />
            <RadialBar dataKey="value" background cornerRadius={5} />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
