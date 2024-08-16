import { createContext, useContext, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { server } from '../lib/server';

const SocketContext = createContext();

const getSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  const socketRef = useRef();

  if (!socketRef.current) {
    socketRef.current = io(server, {
      withCredentials: true,
      transports: ['websocket'],
    });
  }

  useEffect(() => {
    const socket = socketRef.current;


    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};

export { getSocket, SocketProvider };
