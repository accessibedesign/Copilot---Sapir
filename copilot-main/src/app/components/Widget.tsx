import { useState, useEffect } from "react";
import { motion } from "motion/react";
import TopBar from "./TopBar";
import WelcomeContent from "./WelcomeContent";
import SettingsPanel from "./SettingsPanel";
import ChatInput from "./ChatInput";
import Footer from "./Footer";
import LanguageDrawer from "./LanguageDrawer";
import HideDialog from "./HideDialog";
import TabContent from "./TabContent";

interface WidgetProps {
  onClose: () => void;
  onHide: () => void;
}

export default function Widget({ onClose, onHide }: WidgetProps) {
  // FIX #1: Theme persistence - read from localStorage before initial render
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("widget-theme") as "light" | "dark") || "dark";
    }
    return "dark";
  });
  
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "manual" | "statement">("chat");
  const [isLanguageDrawerOpen, setIsLanguageDrawerOpen] = useState(false);
  const [isHideDialogOpen, setIsHideDialogOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  // FIX #1: Persist theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("widget-theme", theme);
  }, [theme]);

  const handleSuggestionClick = (suggestion: string) => {
    setChatInput(suggestion);
    setIsThinking(true);
    setTimeout(() => {
      setIsThinking(false);
    }, 2000);
  };

  const handleSend = () => {
    if (chatInput.trim()) {
      setIsThinking(true);
      setTimeout(() => {
        setIsThinking(false);
        setChatInput("");
      }, 2000);
    }
  };

  const handleHideClick = () => {
    setIsHideDialogOpen(true);
  };

  const confirmHide = () => {
    setIsHideDialogOpen(false);
    onHide();
  };

  return (
    // Widget container - Fixed positioning context.
    // POINTER EVENTS NONE on root to allow clicking through the shadow area outside the widget.
    <motion.div
      className="fixed z-40"
      style={{
        bottom: "24px",
        right: "24px",
        width: "480px",
        maxHeight: "calc(100vh - 48px)",
        height: "min(760px, calc(100vh - 48px))",
        pointerEvents: "none"
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ 
        opacity: 0,
        y: 10,
        transition: {
          duration: 0.2,
          ease: [0.4, 0.0, 1, 1]
        }
      }}
      transition={{
        duration: 0.4,
        ease: [0.4, 0.0, 0.2, 1]
      }}
    >
      {/* SHADOW LAYER: Absolute, overflow visible. Draws the shadow. */}
      <div 
        className="absolute inset-0 rounded-[20px] shadow-[0px_4px_31px_0px_rgba(10,37,64,0.25)] transition-all duration-500 pointer-events-none"
      />

      {/* CONTENT MASK: Absolute, overflow hidden. Draws the background/glass. */}
      {/* POINTER EVENTS AUTO to capture clicks inside. */}
      <div 
        className={`absolute inset-0 overflow-hidden backdrop-blur-[20px] backdrop-filter ${
          theme === "light" 
            ? "bg-[rgba(255,255,255,0.85)]" 
            : "bg-[rgba(0,7,26,0.85)]"
        } content-stretch flex flex-col pb-[16px] pt-[20px] px-0 relative rounded-[20px] size-full transition-colors duration-500 pointer-events-auto`}
      >
        <div 
          aria-hidden="true" 
          className={`absolute ${
            theme === "light"
              ? "border-[rgba(10,37,64,0.1)]"
              : "border-[rgba(255,255,255,0.1)]"
          } border-2 border-solid inset-[-2px] pointer-events-none rounded-[22px] transition-colors duration-500`} 
        />
        
        {/* Scrollable content container */}
        <div className="flex flex-col size-full overflow-y-auto overflow-x-hidden relative z-10">
          <TopBar 
            onClose={onClose}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            isSettingsOpen={isSettingsOpen}
            onSettingsToggle={() => setIsSettingsOpen(!isSettingsOpen)}
            theme={theme}
            onLanguageClick={() => setIsLanguageDrawerOpen(true)}
            onHideClick={handleHideClick}
            onThemeToggle={() => setTheme(theme === "light" ? "dark" : "light")}
            selectedLanguage={selectedLanguage}
          />

          {/* Content Area - No sliding for settings anymore */}
          <div className="relative flex-1 overflow-hidden">
            {/* Main Content */}
            <div className="w-full h-full flex flex-col items-center px-[24px] pt-[20px]">
              {activeTab === "chat" ? (
                <>
                  <div className="content-stretch flex flex-col gap-[35px] items-center justify-end relative h-full w-[432px]">
                    <WelcomeContent 
                      onSuggestionClick={handleSuggestionClick}
                      theme={theme}
                    />
                    <div className="content-stretch flex flex-col gap-[16px] items-center justify-center relative shrink-0 w-full">
                      <ChatInput
                        value={chatInput}
                        onChange={setChatInput}
                        onSend={handleSend}
                        isRecording={isRecording}
                        onRecordToggle={() => setIsRecording(!isRecording)}
                        theme={theme}
                        isThinking={isThinking}
                      />
                      <Footer theme={theme} />
                    </div>
                  </div>
                </>
              ) : (
                <TabContent tab={activeTab} theme={theme} />
              )}
            </div>
          </div>
        </div>

        {/* FIX #3: Language Drawer - NOW INSIDE WIDGET with absolute positioning */}
        <LanguageDrawer
          isOpen={isLanguageDrawerOpen}
          onClose={() => setIsLanguageDrawerOpen(false)}
          selectedLanguage={selectedLanguage}
          onSelectLanguage={setSelectedLanguage}
          theme={theme}
        />

        {/* FIX #3: Hide Dialog - NOW INSIDE WIDGET with absolute positioning */}
        <HideDialog
          isOpen={isHideDialogOpen}
          onClose={() => setIsHideDialogOpen(false)}
          onConfirm={confirmHide}
          theme={theme}
        />
      </div>
    </motion.div>
  );
}