// src/components/InstallPrompt.jsx
import React, { useEffect, useState } from "react";

function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);

      if (isMobile) {
        setShowInstallButton(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, [isMobile]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      alert("📲 To install, open browser menu and select 'Add to Home Screen'");
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("✅ User accepted install");
    } else {
      console.log("❌ User dismissed install");
    }

    setDeferredPrompt(null);
    setShowInstallButton(true);
  };

  if (!showInstallButton) return null;

  return (
    <div className="fixed bottom-5 right-5">
      <button
        onClick={handleInstallClick}
        className="px-5 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700"
      >
        📲 Install App
      </button>
    </div>
  );
}

export default InstallPrompt;
