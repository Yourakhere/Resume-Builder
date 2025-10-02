import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/ResumeUpdate/LandingPage";
import Dashboard from "./pages/Home/Dashboard";
import EditResume from "./pages/ResumeUpdate/EditResume";
import UserProvider from "./context/userContext";

function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  // ✅ Detect mobile
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);

      // Always show button when available + mobile
      if (isMobile) {
        setShowInstallButton(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, [isMobile]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("✅ User accepted install");
    } else {
      console.log("❌ User dismissed install");
    }

    // ⚡ Reset so popup can appear again later
    setDeferredPrompt(null);
    setShowInstallButton(true); // keep showing button on every visit
  };

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

        {/* 📲 Install Button (Always shows on visit if mobile) */}
        {showInstallButton && (
          <div className="fixed bottom-5 right-5">
            <button
              onClick={handleInstallClick}
              className="px-5 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700"
            >
              📲 Install App
            </button>
          </div>
        )}

        {/* Toast */}
        <Toaster
          toastOptions={{
            className: "",
            style: {
              fontSize: "13px",
            },
          }}
        />
      </div>
    </UserProvider>
  );
}

export default App;
