// import { Sidebar } from "./components"
// import { Dashboard } from "./pages"

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Login, Dashboard, AddClassroom, Signup, ClassroomOverview } from './pages/index';
import { useAuthContext } from './hooks/useAuthContext';
export default function App() {
  const { user } = useAuthContext()
  return (
    <div className='bg-bggray h-screen'>
    <Router>
      <Routes>
        {/* <Route path='/' element={<Navigate to="/login" />} /> 
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={!isLoggedIn ? <Navigate to="/login" /> : <Dashboard />} />
        <Route path='/addclassroom' element={!isLoggedIn ? <Navigate to="/login" /> : <AddClassroom />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='*' element={<Navigate to="/login" />} />  */}
        <Route
          path="/"
          element={user ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/" />}
        />
        <Route
          path="/addclassroom"
          element={user ? <AddClassroom /> : <Navigate to="/login" />}
        />
        <Route
          path="/classroomoverview"
          element={user ? <ClassroomOverview /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  </div>
  );
}