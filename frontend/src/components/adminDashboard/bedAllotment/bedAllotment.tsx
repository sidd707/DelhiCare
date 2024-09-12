"use client";

import { Bed, HeartPulse, AlertCircle, CheckCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Barchart } from "../charts/barChart";
import BedRequest from "./bedRequest";
import { BarAllotment } from "../charts/barAllotment";
import AllotmentRecord from "./allotmentRecord";
import { useBedStatsQuery } from "@/redux/apis/dashBoardApi";

// Define the structure of bedTypes

// Define types for the props
interface BedCardProps {
  title: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  value: number | undefined;
  description: string;
}

function BedCard({ title, Icon, value, description }: BedCardProps) {
  return (
    <Card className="transition-transform transform hover:scale-105 duration-300 ease-in-out">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value ?? "N/A"}</div> {/* Safeguard for undefined values */}
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

export function BedAllotment() {
  const { data: bedStatsData, isLoading, isError } = useBedStatsQuery('');

  if (isLoading) {
    return <div>Loading...</div>; // Display loading state
  }

  if (isError || !bedStatsData) {
    return <div>Something went wrong. Please try again later.</div>; // Display error state
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
      {/* Bed Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:col-span-12">
        {[
          {
            title: "ICU Beds",
            icon: HeartPulse,
            value: bedStatsData?.data?.countBeds?.allocatedBedsICU,
            description: "Allocated ICU Beds",
          },
          {
            title: "Emergency Beds",
            icon: AlertCircle,
            value: bedStatsData?.data?.countBeds?.allocatedBedsEmergency,
            description: "Allocated Emergency Beds",
          },
          {
            title: "General Beds",
            icon: Bed,
            value: bedStatsData?.data?.countBeds?.allocatedBedsGeneral,
            description: "Allocated General Beds",
          },
          {
            title: "Total Beds",
            icon: CheckCircle,
            value: bedStatsData?.data?.countBeds?.totalAllocatedBeds,
            description: "Total Beds Allocated",
          },
        ].map((bedType) => (
          <div className="col-span-1" key={bedType.title}>
            <BedCard
              title={bedType.title}
              Icon={bedType.icon}
              value={bedType.value}
              description={bedType.description}
            />
          </div>
        ))}
      </div>

      {/* Graph section */}
      <div className="col-span-1 sm:col-span-2 lg:col-span-6">
        <Barchart chartData={bedStatsData?.data?.bedStats} /> {/* Placeholder for the actual chart */}
      </div>

      {/* Bed Request section */}
      <div className="col-span-1 sm:col-span-2 lg:col-span-6">
        <BedRequest />
      </div>

      {/* Bar Allotment section */}
      <div className="col-span-1 sm:col-span-2 lg:col-span-12">
        <BarAllotment chartData={bedStatsData?.data?.lastThreeMonthsPatients} />
      </div>

      {/* Allotment Record section */}
      <div className="col-span-1 sm:col-span-2 lg:col-span-12">
        <AllotmentRecord />
      </div>
    </div>
  );
}
