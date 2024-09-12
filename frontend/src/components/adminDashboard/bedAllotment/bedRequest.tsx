"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useSocket } from "@/components/hooks/useSocket";
import { useGetBedRequestsQuery, useHandleBedRequestActionMutation } from "@/redux/apis/notificationApi";
import { useState } from "react";

export default function BedRequest() {
  const hospitalId = "66cb40474edb56b45ea1f793";
  
  // Fetch the initial bed requests
  const { data: initialRequestsResponse, isLoading, error } = useGetBedRequestsQuery('');
  
  // Mutation handler for bed request actions
  const [handleBedRequestAction] = useHandleBedRequestActionMutation();
  const [score,setScore] = useState(1);
  
  // Use WebSocket to receive real-time notifications
  const { notifications } = useSocket(hospitalId);

  console.log("Initial Requests Response:", initialRequestsResponse); // For debugging

  // Safeguard: Extract the data array from the initialRequestsResponse
  const initialRequestsArray = initialRequestsResponse?.data || [];

  // Wait until initialRequests is loaded before proceeding
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching requests</div>;
  }

  // Combine the notifications with the initial requests once both are available
  const combinedRequests = [...notifications, ...initialRequestsArray];

  const handleAction = async (notificationId: any, action: any, score:any) => {
    console.log(notificationId,action);
    try {
      await handleBedRequestAction({notificationId, action ,score}).unwrap();
      console.log(`Request ${action.toLowerCase()}d`);
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
        {combinedRequests.length === 0 ? (
          <p>No notifications</p>
        ) : (
          combinedRequests.map((request, index) => (
            <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Patient Name: {request.patientId.name}</p>
                <p className="text-sm text-muted-foreground">Hospital: {request.hospitalId.name}</p>
                <p className="text-sm text-muted-foreground">Message: {request.message}</p>
                <p className="text-sm text-muted-foreground">Department: {request.patientId.department}</p>
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
                <Button onClick={() => handleAction(request._id, 'Approve',score)}>Accept</Button>
                <Button onClick={() => handleAction(request._id, 'Reject', score)}>Reject</Button>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
