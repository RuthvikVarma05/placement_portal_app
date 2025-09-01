import { useState, useEffect, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import ResumeBuilder from "./pages/ResumeBuilder";
import Jobs from "./pages/Jobs";
import Profile from "./pages/Profile";
import JobDetails from "./pages/JobDetails";

function App() {

  const {isAuthenticated, loading} = useContext(AuthContext);

  if (loading) return <div className="text-center mt-20"> Loading...</div>

  return (
    <Routes>
      <Route path="/signup" element={<Signup/>} />
      <Route path="/login" element={<Login/>} />

      <Route
        path="/"
        element={
          isAuthenticated ? (
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
          ) : (
            <Navigate to="/login"/>
          )
        }
        />

      <Route path="*" element={<Navigate to="/login"/>} />
      <Route path="/resume" element={<PrivateRoute><ResumeBuilder /></PrivateRoute>}/> 
      <Route path="/jobs" element={<PrivateRoute><Jobs /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      {/* <Route path="/jobs/:id" element={<JobDetails/>} /> */}

    </Routes>
      
  )
}

export default App
