import { motion, AnimatePresence } from "motion/react";

interface HideDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  theme: "light" | "dark";
}

export default function HideDialog({ isOpen, onClose, onConfirm, theme }: HideDialogProps) {
  const isDark = theme === "dark";

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
            className="absolute inset-0 bg-black/50 z-50 backdrop-blur-sm rounded-[20px]"
          />

          {/* Dialog - absolute positioned, centered within widget */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{
              duration: 0.3,
              ease: [0.4, 0.0, 0.2, 1]
            }}
            className="absolute z-50 w-[400px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <div 
              className={`${
                isDark ? "bg-[#1a1f2e]" : "bg-white"
              } rounded-[16px] shadow-[0px_8px_32px_0px_rgba(0,0,0,0.2)] p-[32px]`}
            >
              {/* Icon */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.2,
                  delay: 0.1
                }}
                className="flex justify-center mb-[24px]"
              >
                <div className={`size-[60px] rounded-full ${
                  isDark ? "bg-[rgba(255,255,255,0.1)]" : "bg-[#f0f4f8]"
                } flex items-center justify-center`}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path 
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" 
                      fill={isDark ? "rgba(255,255,255,0.8)" : "#00071a"}
                    />
                  </svg>
                </div>
              </motion.div>

              {/* Title */}
              <h2 
                className={`font-['CircularXX:Medium',sans-serif] text-[22px] text-center mb-[12px] ${
                  isDark ? "text-white" : "text-[#00071a]"
                }`}
              >
                Hide Widget
              </h2>

              {/* Message */}
              <p 
                className={`font-['CircularXX:Regular',sans-serif] text-[16px] text-center mb-[32px] leading-[1.5] ${
                  isDark ? "text-[rgba(255,255,255,0.8)]" : "text-[#3a4b61]"
                }`}
              >
                To return, press the <strong className={isDark ? "text-white" : "text-[#00071a]"}>Alt</strong> key twice
              </p>

              {/* Buttons */}
              <div className="flex gap-[12px]">
                <button
                  onClick={onClose}
                  className={`flex-1 py-[12px] px-[24px] rounded-[10px] text-[16px] transition-colors duration-200 ${
                    isDark 
                      ? "bg-[rgba(255,255,255,0.1)] text-white hover:bg-[rgba(255,255,255,0.15)]" 
                      : "bg-[#f0f4f8] text-[#00071a] hover:bg-[#e5ecf2]"
                  }`}
                  style={{ fontFamily: "CircularXX:Medium, sans-serif" }}
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  className={`flex-1 py-[12px] px-[24px] rounded-[10px] text-[16px] transition-colors duration-200 ${
                    isDark 
                      ? "bg-white text-[#00071a] hover:bg-[rgba(255,255,255,0.9)]" 
                      : "bg-[#00071a] text-white hover:bg-[#001028]"
                  }`}
                  style={{ fontFamily: "CircularXX:Medium, sans-serif" }}
                >
                  Hide
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}