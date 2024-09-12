"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

// Mock data for bed requests
const mockRequests = [
  {
    _id: "1",
    patientId: {
      name: "John Doe",
      department: "ICU",
    },
    hospitalId: {
      name: "City Hospital",
    },
    message: "Requesting bed in ICU",
  },
  {
    _id: "2",
    patientId: {
      name: "Jane Smith",
      department: "General",
    },
    hospitalId: {
      name: "Community Hospital",
    },
    message: "Requesting bed in General ward",
  },
];

export default function BedRequest() {
  // Replace the API fetching and WebSocket notifications with mock data
  const [requests, setRequests] = useState(mockRequests);
  const [score, setScore] = useState(1);

  const handleAction = async (notificationId: any, action: any, score: any) => {
    console.log(notificationId, action, score);
    try {
      // Simulate success for mock data handling
      console.log(`Request ${action.toLowerCase()}d with score: ${score}`);
      // Optionally, remove the request from the list after handling the action
      setRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== notificationId)
      );
    } catch (error) {
      console.error(`Error ${action.toLowerCase()}ing request:`, error);
    }
  };

  return (
    <Card className="min-h-full">
      <CardHeader>
        <CardTitle>Recent Requests</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        {requests.length === 0 ? (
          <p>No notifications</p>
        ) : (
          requests.map((request, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  Patient Name: {request.patientId.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  Hospital: {request.hospitalId.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  Message: {request.message}
                </p>
                <p className="text-sm text-muted-foreground">
                  Department: {request.patientId.department}
                </p>
                <input
                  className="border rounded px-2 py-1 text-sm mt-2"
                  placeholder="Score"
                  value={score}
                  onChange={(e) => setScore(Number(e.target.value))}
                  min="1"
                  max="5"
                />
              </div>
              <div className="flex gap-2 sm:ml-auto">
                <Button
                  onClick={() => handleAction(request._id, "Approve", score)}
                >
                  Accept
                </Button>
                <Button
                  onClick={() => handleAction(request._id, "Reject", score)}
                >
                  Reject
                </Button>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}

