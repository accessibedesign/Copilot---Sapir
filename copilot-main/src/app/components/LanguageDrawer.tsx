import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

interface LanguageDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLanguage: string;
  onSelectLanguage: (language: string) => void;
  theme: "light" | "dark";
}

const languages = [
  { name: "English", flag: "🇺🇸" },
  { name: "Spanish", flag: "🇪🇸" },
  { name: "French", flag: "🇫🇷" },
  { name: "German", flag: "🇩🇪" },
  { name: "Italian", flag: "🇮🇹" },
  { name: "Portuguese", flag: "🇵🇹" },
  { name: "Russian", flag: "🇷🇺" },
  { name: "Chinese", flag: "🇨🇳" },
  { name: "Japanese", flag: "🇯🇵" },
  { name: "Korean", flag: "🇰🇷" },
  { name: "Arabic", flag: "🇸🇦" },
  { name: "Hindi", flag: "🇮🇳" },
  { name: "Dutch", flag: "🇳🇱" },
  { name: "Polish", flag: "🇵🇱" },
  { name: "Turkish", flag: "🇹🇷" },
  { name: "Swedish", flag: "🇸🇪" },
  { name: "Danish", flag: "🇩🇰" },
  { name: "Norwegian", flag: "🇳🇴" },
  { name: "Finnish", flag: "🇫🇮" },
  { name: "Greek", flag: "🇬🇷" },
  { name: "Czech", flag: "🇨🇿" },
  { name: "Hebrew", flag: "🇮🇱" },
];

export default function LanguageDrawer({ 
  isOpen, 
  onClose, 
  selectedLanguage, 
  onSelectLanguage,
  theme 
}: LanguageDrawerProps) {
  const [dragY, setDragY] = useState(0);
  const isDark = theme === "dark";

  const handleLanguageSelect = (language: string) => {
    onSelectLanguage(language);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - absolute positioned within widget */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 z-50 backdrop-blur-sm rounded-[20px]"
          />

          {/* Drawer - absolute positioned within widget, slides from bottom */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: dragY }}
            exit={{ y: "100%" }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.2 }}
            onDragEnd={(e, info) => {
              if (info.offset.y > 100) {
                onClose();
              } else {
                setDragY(0);
              }
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
            className={`absolute ${
              isDark ? "bg-[#1a1f2e]" : "bg-white"
            } rounded-t-[24px] z-50 max-h-[60vh] flex flex-col shadow-[0px_-4px_24px_0px_rgba(0,0,0,0.15)] inset-x-0 bottom-0`}
          >
            {/* Drag Handle */}
            <div className="flex items-center justify-center py-[12px] cursor-grab active:cursor-grabbing">
              <div className={`w-[40px] h-[4px] rounded-full ${
                isDark ? "bg-[rgba(255,255,255,0.2)]" : "bg-[rgba(0,0,0,0.1)]"
              }`} />
            </div>

            {/* Title */}
            <div className="px-[24px] pb-[16px]">
              <h2 
                className={`font-['CircularXX:Medium',sans-serif] text-[20px] ${
                  isDark ? "text-white" : "text-[#00071a]"
                }`}
              >
                Select Language
              </h2>
            </div>

            {/* Language List */}
            <div className="flex-1 overflow-y-auto px-[16px] pb-[24px]">
              {languages.map((language, index) => (
                <motion.button
                  key={language.name}
                  onClick={() => handleLanguageSelect(language.name)}
                  className={`w-full flex items-center gap-[16px] px-[16px] py-[14px] rounded-[12px] ${
                    selectedLanguage === language.name
                      ? isDark 
                        ? "bg-[rgba(255,255,255,0.15)]" 
                        : "bg-[#f0f4f8]"
                      : "hover:bg-[rgba(0,0,0,0.03)]"
                  } transition-colors duration-200`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: index * 0.02,
                    duration: 0.3
                  }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-center justify-center size-[32px] rounded-full bg-[rgba(0,0,0,0.05)] text-[18px]">
                    {language.flag}
                  </div>
                  <div 
                    className={`flex-1 text-left font-['CircularXX:Regular',sans-serif] text-[16px] ${
                      isDark ? "text-white" : "text-[#00071a]"
                    }`}
                  >
                    {language.name}
                  </div>
                  {selectedLanguage === language.name && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="size-[20px] rounded-full bg-[#027D76] flex items-center justify-center"
                    >
                      <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                        <path d="M1 5L4.5 8.5L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}