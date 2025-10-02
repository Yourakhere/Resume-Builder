
{/**
    

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





 */}


    import React, { useEffect, useState } from "react";
import { Download, X, Smartphone } from "lucide-react";

function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

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
      setIsVisible(false);
    } else {
      console.log("❌ User dismissed install");
    }

    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!showInstallButton || !isVisible) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-bounce">
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl shadow-2xl overflow-hidden">
 
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 p-1 hover:bg-white/20 rounded-full transition-colors"
          aria-label="Dismiss"
        >
          <X size={16} />
        </button>
 
        <div className="px-6 py-4 pr-10">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-xl">
              <Smartphone size={24} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm">Install App</h3>
              <p className="text-xs text-blue-100">Quick access from home screen</p>
            </div>
          </div>

          <button
            onClick={handleInstallClick}
            className="mt-3 w-full flex items-center justify-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-xl font-medium text-sm hover:bg-blue-50 transition-colors shadow-md"
          >
            <Download size={18} />
            Install Now
          </button>
        </div>
 
        <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-blue-500/30 rounded-full blur-2xl"></div>
      </div>
    </div>
  );
}

export default InstallPrompt;