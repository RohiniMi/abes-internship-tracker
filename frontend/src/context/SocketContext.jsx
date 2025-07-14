import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();
export const useSocket = () => useContext(SocketContext);
export const SocketProvider = ({ children, userId }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (userId) {
      const newSocket = io("http://172.16.48.192:7890");

      newSocket.on("connect", () => {
        console.log("🟢 Socket connected:", newSocket.id);
        newSocket.emit("join", userId);
      });

      newSocket.on("receive-message", (msg) => {
        console.log("📥 New message received:", msg);
      });

      newSocket.on("connect_error", (err) => {
        console.error("🔴 Socket connection error:", err);
      });

      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
        console.log("🔌 Socket disconnected");
      };
    }
  }, [userId]);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};
