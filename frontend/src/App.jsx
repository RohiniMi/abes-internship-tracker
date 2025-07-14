import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from "./Components/Header.jsx";
import Main from "./Components/Main.jsx";
import Support from "./Components/Support.jsx";
import Footer from "./Components/Footer.jsx";
import Login from "./Components/Login.jsx";
import Dashboard2 from './Components/Dashboard2.jsx';
import HODDashboard from './Components/HODDashboard.jsx';
import Notification from './Components/Notification.jsx';
import SendIDPass from './Components/SendIDPass.jsx';
import ProtectedRoute from './Components/ProtectedRoute.jsx'; // 👈 Import this
import AdminManagedWork from './Components/ADMIN/AdminManagedWork.jsx';
import MessengerPanel from './Components/MessengerPanel.jsx';
import { SocketProvider } from './context/SocketContext';
const storage = localStorage.getItem("token") ? localStorage : sessionStorage;
const userId = storage.getItem("email");; 
console.log("userId from App.jsx",userId);


const App = () => {
  return (
    <SocketProvider userId={userId}>
      <Router>
        <div id="root">
          <Header />
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<ProtectedRoute element={Dashboard2} allowedRoles={['admin', 'ccpd']} />} />
            <Route path="/internship" element={<ProtectedRoute element={Main} allowedRoles={['student']} />} />
            <Route path="/hod-dashboard" element={<ProtectedRoute element={HODDashboard} allowedRoles={['hod']} />} />
            <Route path="/notification" element={<ProtectedRoute element={Notification} allowedRoles={['hod']} />} />
            <Route path="/send-id-pass" element={<ProtectedRoute element={SendIDPass} allowedRoles={['hod', 'admin']} />} />
            <Route path="/admin-manage" element={<ProtectedRoute element={AdminManagedWork} allowedRoles={['admin','hod']} />} />
            <Route path="/messenger" element={<ProtectedRoute element={MessengerPanel} allowedRoles={['admin','hod','ccpd','student']} />} />
          </Routes>
          <Support />
          <Footer />
        </div>
      </Router>
    </SocketProvider>
  );

};

export default App;
