// src/components/ChatWindow.jsx
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useSocket } from '../context/SocketContext.jsx';

const API = "http://localhost:7890/messenger";

const ChatWindow = ({ currentUserId, selectedUser, onBack }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const socket = useSocket();
    const scrollRef = useRef();

    useEffect(() => {
        axios.get(`${API}/messages/${currentUserId}/${selectedUser.email}`)
            .then((res) => setMessages(res.data))
            .catch((err) => console.error("Error fetching messages:", err));
    }, [selectedUser.email, currentUserId]);

    useEffect(() => {
        if (!socket) return;

        const handler = (msg) => {
            if (
                (msg.senderId === selectedUser.email && msg.receiverId === currentUserId) ||
                (msg.senderId === currentUserId && msg.receiverId === selectedUser.email)
            ) {
                setMessages((prev) => [...prev, msg]);
            }
        };

        socket.on("receive-message", handler);
        return () => socket.off("receive-message", handler);
    }, [socket, selectedUser.email, currentUserId]);


    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const msg = {
            senderId: currentUserId,
            receiverId: selectedUser.email,
            content: input,
        };

        try {
            const res = await axios.post(`${API}/messages`, msg); 
            setMessages((prev) => [...prev, res.data]); 

            if (socket) {
                socket.emit("send-message", res.data); 
            }

            setInput('');
        } catch (err) {
            console.error("Error sending message:", err);
        }
    };

    return (
        <div style={{
            position: 'fixed',
            right: 0,
            top: 80,
            width: '50%',
            height: 'calc(100vh - 80px)',
            background: '#f8f8f8',
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '-2px 0px 10px rgba(0,0,0,0.1)',
            zIndex: 1000
        }}>
            <div style={{
                padding: '10px',
                backgroundColor: '#f0f0f0',
                borderBottom: '1px solid #ccc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <button onClick={onBack}>← Back</button>
                <h3 style={{ margin: 0 }}>{selectedUser.name}</h3>
                <div style={{ width: 50 }} /> {/* spacing */}
            </div>
            <div style={{
                flex: 1,
                padding: '10px',
                overflowY: 'auto',
                backgroundColor: '#e5ddd5'
            }}>
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        style={{
                            display: 'flex',
                            justifyContent: msg.senderId === currentUserId ? 'flex-end' : 'flex-start',
                            marginBottom: '8px'
                        }}
                    >
                        <div style={{
                            maxWidth: '70%',
                            padding: '10px',
                            borderRadius: '10px',
                            backgroundColor: msg.senderId === currentUserId ? '#dcf8c6' : '#fff',
                            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.1)'
                        }}>
                            {msg.content}
                        </div>
                    </div>
                ))}
                <div ref={scrollRef}></div>
            </div>

            <div style={{
                display: 'flex',
                borderTop: '1px solid #ccc',
                padding: '10px',
                backgroundColor: '#f0f0f0'
            }}>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault(); // prevent newline
                            sendMessage();
                        }
                    }}
                    placeholder="Type a message"
                    style={{
                        flex: 1,
                        padding: '10px',
                        borderRadius: '20px',
                        border: '1px solid #ccc',
                        outline: 'none',
                        fontSize: '14px'
                    }}
                />
                <button onClick={sendMessage} style={{
                    marginLeft: '10px',
                    padding: '10px 15px',
                    borderRadius: '50%',
                    backgroundColor: '#128c7e',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer'
                }}>
                    ➤
                </button>
            </div>
        </div>
    );
};

export default ChatWindow;
