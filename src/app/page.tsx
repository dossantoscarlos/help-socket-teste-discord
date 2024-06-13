'use client';
// pages/index.js
import { useEffect } from 'react';
import { io }  from 'socket.io-client';

let socket:any;

const Home = () => {
  useEffect(() => {
    // Connect to the server
    socket = io("http://localhost:3000");

    // Listen for events
    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.emit('chat message', 'Hello', (resp: any) => console.log(resp));

    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    // Clean up the connection on unmount
    return () => {
       socket.off('connect');
       socket.off('disconnect');
       socket.close();
    };
  }, []);

  return (
    <div>
      <h1>WebSocket with Next.js</h1>
    </div>
  );
};

export default Home;
