import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChatWindow from './ChatWindow';
import { useSocket } from '../context/SocketContext';
import { useNavigate } from 'react-router-dom'; 

const API = "http://localhost:7890/messenger";

const MessengerPanel = () => {
    const storage = localStorage.getItem("token") ? localStorage : sessionStorage;
    const userId = storage.getItem("email");
    const socket = useSocket();
    const navigate = useNavigate();

    const [unreadFrom, setUnreadFrom] = useState([]);
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (search) {
                axios.get(`${API}/users?search=${search}`).then((res) => setUsers(res.data));
            } else {
                setUsers([]);
            }
        }, 300);
        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    useEffect(() => {
        if (!socket) return;

        const handleIncomingMessage = ({ senderId }) => {
            if (!selectedUser || selectedUser.email !== senderId) {
                setUnreadFrom(prev => [...new Set([...prev, senderId])]);
            }
        };

        socket.on("receive-message", handleIncomingMessage);
        return () => socket.off("receive-message", handleIncomingMessage);
    }, [socket, selectedUser]);

    const handleClose = () => {
        navigate(-1);
    };

    return (
        <div style={{
            position: 'fixed',
            right: 0,
            top: 80,
            width: '50%',
            height: '100%',
            background: '#f8f8f8',
            padding: '10px',
            boxShadow: '-2px 0px 10px rgba(0,0,0,0.1)'
        }}>
            <button onClick={handleClose}>Close</button>
            {!selectedUser ? (
                <>
                    <input
                        type="text"
                        placeholder="Search name or email"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <ul>
                        {users.map((user) => (
                            <li
                                key={user._id}
                                onClick={() => {
                                    setSelectedUser(user);
                                    setUnreadFrom(prev => prev.filter(id => id !== user.email));
                                }}
                                style={{ cursor: 'pointer', padding: '8px 0' }}
                            >
                                {user.name} - {user.email}
                                {unreadFrom.includes(user.email) && (
                                    <span style={{ color: 'red', marginLeft: 8 }}>●</span>
                                )}
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <ChatWindow
                    currentUserId={userId}
                    selectedUser={selectedUser}
                    onBack={() => setSelectedUser(null)}
                />
            )}
        </div>
    );
};

export default MessengerPanel;
