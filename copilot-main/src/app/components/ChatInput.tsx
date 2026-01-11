import { motion, AnimatePresence } from "motion/react";
import svgPaths from "../../imports/svg-7qj6ackrj5";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isRecording: boolean;
  onRecordToggle: () => void;
  theme: "light" | "dark";
  isThinking: boolean;
}

export default function ChatInput({ 
  value, 
  onChange, 
  onSend, 
  isRecording, 
  onRecordToggle,
  theme,
  isThinking
}: ChatInputProps) {
  const isDark = theme === "dark";
  const textColor = isDark ? "rgba(255,255,255,0.9)" : "rgba(10,37,64,0.6)";
  // FIX #9: Improved input visibility with stronger background
  const bgColor = isDark ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.95)";
  const borderColor = isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)";

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim()) {
        onSend();
      }
    }
  };

  return (
    <div className="relative shrink-0 w-full">
      <div 
        className={`backdrop-blur-[10px] backdrop-filter h-[100px] max-h-[160px] relative rounded-[12px] shrink-0 w-full transition-colors duration-300`}
        style={{ backgroundColor: bgColor }}
      >
        <div 
          aria-hidden="true" 
          className={`absolute ${
            isDark ? "border-[rgba(255,255,255,0.1)]" : "border-[rgba(0,0,0,0.05)]"
          } border border-solid inset-[-1px] pointer-events-none rounded-[13px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.02),0px_8px_24px_0px_rgba(0,0,0,0.02)]`} 
        />
        <div className="flex flex-col items-end max-h-[inherit] size-full">
          <div className="content-stretch flex flex-col items-end justify-between max-h-[inherit] px-[16px] py-[12px] relative size-full">
            {/* Input Text */}
            <div className="content-stretch flex items-start relative shrink-0 w-full flex-1">
              <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="How can I guide you today?"
                className={`flex-1 bg-transparent outline-none resize-none font-['CircularXX:Regular',sans-serif] text-[16px] leading-[1.25] w-full h-full ${
                  value ? (isDark ? "text-white" : "text-[#0A2540]") : ""
                }`}
                style={{ 
                  color: value ? (isDark ? "white" : "#0A2540") : textColor
                }}
                disabled={isThinking}
              />
            </div>

            {/* Status and Actions */}
            <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
              {/* Thinking Indicator */}
              <AnimatePresence>
                {isThinking && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className={`${
                      isDark ? "bg-[rgba(255,255,255,0.15)]" : "bg-[#f4f4f4]"
                    } content-stretch flex gap-[6px] items-center justify-center pl-[8px] pr-[10px] py-[6px] rounded-[100px] shrink-0`}
                  >
                    <div className="flex gap-[4px]">
                      <motion.div
                        className={`size-[7px] rounded-full ${isDark ? "bg-white" : "bg-[#027D76]"}`}
                        animate={{
                          opacity: [1, 0.4, 1]
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: 0
                        }}
                      />
                      <motion.div
                        className={`size-[7px] rounded-full ${isDark ? "bg-white" : "bg-[#027D76]"}`}
                        animate={{
                          opacity: [1, 0.4, 1]
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: 0.2
                        }}
                      />
                      <motion.div
                        className={`size-[7px] rounded-full ${isDark ? "bg-white" : "bg-[#027D76]"}`}
                        animate={{
                          opacity: [1, 0.4, 1]
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: 0.4
                        }}
                      />
                    </div>
                    <div 
                      className={`flex flex-col font-['CircularXX:Regular',sans-serif] justify-end leading-[0] not-italic relative shrink-0 text-[14px] text-nowrap ${
                        isDark ? "text-white" : "text-[#00071a]"
                      }`}
                    >
                      <p className="leading-none">Thinking...</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className={`content-stretch flex gap-[12px] items-center justify-end relative shrink-0 ${isThinking ? "opacity-50 pointer-events-none" : ""}`}>
                {/* Microphone Button */}
                <motion.button
                  onClick={onRecordToggle}
                  className={`${
                    isRecording 
                      ? "bg-red-500" 
                      : isDark ? "bg-[rgba(255,255,255,0.15)]" : "bg-[#f4f4f4]"
                  } content-stretch flex items-center justify-center overflow-clip relative rounded-[32px] shrink-0 size-[32px] transition-colors duration-200`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MicrophoneIcon isRecording={isRecording} theme={theme} />
                </motion.button>

                {/* Send Button */}
                <motion.button
                  onClick={onSend}
                  disabled={!value.trim()}
                  className={`relative shrink-0 size-[32px] rounded-[16px] ${
                    value.trim() 
                      ? isDark ? "bg-white" : "bg-[#00071A]"
                      : isDark ? "bg-[rgba(255,255,255,0.2)]" : "bg-[#f4f4f4]"
                  } transition-all duration-200 ${
                    value.trim() ? "cursor-pointer" : "cursor-not-allowed opacity-50"
                  }`}
                  whileHover={value.trim() ? { scale: 1.05 } : {}}
                  whileTap={value.trim() ? { scale: 0.95 } : {}}
                >
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                    <g>
                      <path 
                        d={svgPaths.p75e8800} 
                        fill={value.trim() ? (isDark ? "#00071A" : "white") : (isDark ? "rgba(255,255,255,0.5)" : "#727E8E")}
                      />
                    </g>
                  </svg>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MicrophoneIcon({ isRecording, theme }: { isRecording: boolean; theme: "light" | "dark" }) {
  const color = isRecording ? "white" : (theme === "dark" ? "rgba(255,255,255,0.8)" : "#5E6C7D");
  
  return (
    <div className="h-[16px] relative shrink-0 w-[12.444px]">
      <div className="absolute inset-[-4.69%_-6.03%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.9444 17.5">
          <g>
            <path d={svgPaths.p28613140} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d={svgPaths.p1ac1b180} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}