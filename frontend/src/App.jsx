import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/ResumeUpdate/LandingPage";
import Dashboard from "./pages/Home/Dashboard";
import EditResume from "./pages/ResumeUpdate/EditResume";
import UserProvider from "./context/userContext";
import InstallPrompt from "./components/InstallPrompt";  

function App() {
  return (
    <UserProvider>
      <div className="flex flex-col min-h-screen bg-gray-100">
        {/* Router */}
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/resume/:resumeId" element={<EditResume />} />
          </Routes>
        </Router>
 
        <InstallPrompt />
 
        <Toaster
          toastOptions={{
            style: { fontSize: "13px" },
          }}
        />
      </div>
    </UserProvider>
  );
}

export default App;
