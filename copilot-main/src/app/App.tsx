import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import FloatingButton from "./components/FloatingButton";
import Widget from "./components/Widget";

export default function App() {
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const [isWidgetHidden, setIsWidgetHidden] = useState(false);
  const [lastAltPress, setLastAltPress] = useState(0);

  // Alt key double-press detection
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Alt") {
        const now = Date.now();
        if (now - lastAltPress < 500) {
          // Double press detected
          if (isWidgetHidden) {
            setIsWidgetHidden(false);
            setIsWidgetOpen(true);
          }
        }
        setLastAltPress(now);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lastAltPress, isWidgetHidden]);

  const toggleWidget = () => {
    if (isWidgetHidden) {
      setIsWidgetHidden(false);
      setIsWidgetOpen(true);
    } else {
      setIsWidgetOpen(!isWidgetOpen);
    }
  };

  const hideWidget = () => {
    setIsWidgetOpen(false);
    setTimeout(() => {
      setIsWidgetHidden(true);
    }, 300);
  };

  return (
    <div 
      className="size-full min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1579478575321-5addbfd43db9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGdhbWUlMjB3ZWJzaXRlJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3Njc2OTc3NTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Floating Button */}
      <AnimatePresence>
        {(!isWidgetOpen || isWidgetHidden) && (
          <FloatingButton 
            onClick={toggleWidget} 
            isHidden={isWidgetHidden}
          />
        )}
      </AnimatePresence>

      {/* Widget */}
      <AnimatePresence>
        {isWidgetOpen && !isWidgetHidden && (
          <Widget onClose={() => setIsWidgetOpen(false)} onHide={hideWidget} />
        )}
      </AnimatePresence>
    </div>
  );
}