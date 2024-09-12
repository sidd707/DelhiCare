import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const SOCKET_URL = 'http://localhost:4000'; // Adjust to your server URL

export function useSocket(hospitalId:string) {
  const [socket, setSocket] = useState<any>(null);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    if (!hospitalId) {
      console.error('Hospital ID is required to join the correct room');
      return;
    }

    const socketIo = io(SOCKET_URL);
    setSocket(socketIo);

    // Join the room for the specific hospital
    socketIo.emit('joinHospital', hospitalId);
    console.log(`Joined room: hospital_${hospitalId}`);

    // Listen for the 'bedAllotmentRequest' event
    socketIo.on('bedAllotmentRequest', (notification: any) => {
      console.log('Received notification for hospital:', hospitalId, notification);
      setNotifications((prev: any[]) => [...prev, notification]);
    });

    return () => {
      socketIo.disconnect();
    };
  }, [hospitalId]);

  return { notifications, socket };
}

