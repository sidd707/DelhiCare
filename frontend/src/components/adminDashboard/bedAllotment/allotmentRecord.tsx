"use client"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Sample data for bed allotment requests
const requests = [
  {
    customer: "Liam Johnson",
    email: "liam@example.com",
    type: "ICU",
    status: "Approved",
    date: "2023-06-23",
  },
  {
    customer: "Olivia Smith",
    email: "olivia@example.com",
    type: "Emergency",
    status: "Rejected",
    date: "2023-06-24",
  },
  {
    customer: "Noah Williams",
    email: "noah@example.com",
    type: "General",
    status: "Approved",
    date: "2023-06-25",
  },
  {
    customer: "Emma Brown",
    email: "emma@example.com",
    type: "ICU",
    status: "Approved",
    date: "2023-06-26",
  },
]

export default function AllotmentRecord() {
  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Bed Allotment Requests</CardTitle>
        <CardDescription>Recent bed allotment requests from your hospital.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead className="hidden sm:table-cell">Type</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead className="text-right">Date Allotted</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="font-medium">{request.customer}</div>
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    {request.email}
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">{request.type}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge className="text-xs" variant={request.status === "Approved" ? "secondary" : "outline"}>
                    {request.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">{request.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
