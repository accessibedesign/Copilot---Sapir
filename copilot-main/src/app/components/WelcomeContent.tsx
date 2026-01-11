import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import svgPaths from "../../imports/svg-7qj6ackrj5";

interface WelcomeContentProps {
  onSuggestionClick: (suggestion: string) => void;
  theme: "light" | "dark";
}

const suggestions = [
  { text: "Where is the menu?", icon: "compass" },
  { text: "I need the Accessibility Statement", icon: "paper" },
  { text: "I can't see the text properly", icon: "settings" },
];

const alternativeSuggestions = [
  "How do I navigate this page?",
  "Can you help me find the search?",
  "I need help with the form",
  "Make the text larger",
  "Where are the settings?",
  "Show me keyboard shortcuts",
];

export default function WelcomeContent({ onSuggestionClick, theme }: WelcomeContentProps) {
  const [currentSuggestions, setCurrentSuggestions] = useState(suggestions);
  const [clickedSuggestion, setClickedSuggestion] = useState<string | null>(null);
  const isDark = theme === "dark";
  const textColor = isDark ? "white" : "#00071a";
  const secondaryTextColor = isDark ? "rgba(255,255,255,0.8)" : "rgba(0,7,26,0.8)";

  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly update one suggestion
      setCurrentSuggestions(prev => {
        const newSuggestions = [...prev];
        const randomIndex = Math.floor(Math.random() * 3);
        const randomSuggestion = alternativeSuggestions[Math.floor(Math.random() * alternativeSuggestions.length)];
        newSuggestions[randomIndex] = { ...newSuggestions[randomIndex], text: randomSuggestion };
        return newSuggestions;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Handle suggestion click - simplified without flying animation
  const handleSuggestionClick = (suggestion: string, e: React.MouseEvent<HTMLButtonElement>) => {
    setClickedSuggestion(suggestion);
    
    // Delay the actual action to allow fade animation
    setTimeout(() => {
      onSuggestionClick(suggestion);
      setClickedSuggestion(null);
    }, 300);
  };

  return (
    <>
      <motion.div 
        className="content-stretch flex flex-col gap-[35px] items-center w-full mb-[35px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1]
        }}
      >
        <motion.div 
          className="flex flex-col gap-[35px] items-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.1,
            duration: 0.6,
            ease: [0.4, 0.0, 0.2, 1]
          }}
        >
          <div 
            className="flex flex-col font-['PolySans:Neutral_Wide',sans-serif] justify-end leading-[0] not-italic relative shrink-0 text-[30px] text-center text-nowrap"
            style={{ color: textColor }}
          >
            <p className="leading-[1.25]">Hi, I'm Ally</p>
          </div>
          <div 
            className="flex flex-col font-['CircularXX:Regular',sans-serif] justify-end leading-[0] not-italic relative shrink-0 text-[18px] text-center w-[408px]"
            style={{ color: textColor }}
          >
            <p className="leading-[1.25]">Your personal accessibility assistant. Type or say how you'd like to optimize your experience</p>
          </div>
        </motion.div>

        {/* FIX #7 & #8: Sample Questions with stable layout and click animation */}
        <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full min-h-[150px]">
          <AnimatePresence mode="popLayout">
            {currentSuggestions.map((suggestion, index) => (
              <motion.button
                key={`${suggestion.text}-${index}`}
                onClick={(e) => handleSuggestionClick(suggestion.text, e)}
                className={`${
                  isDark ? "bg-[rgba(255,255,255,0.1)]" : "bg-[rgba(255,255,255,0.9)]"
                } backdrop-blur-[10px] backdrop-filter relative rounded-[8px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.02),0px_8px_24px_0px_rgba(0,0,0,0.02)] shrink-0 w-full hover:shadow-[0px_4px_12px_0px_rgba(0,0,0,0.08),0px_12px_32px_0px_rgba(0,0,0,0.08)] transition-all duration-200`}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: clickedSuggestion && clickedSuggestion !== suggestion.text ? 0 : 1,
                  x: 0,
                  y: clickedSuggestion === suggestion.text ? 20 : 0
                }}
                exit={{ opacity: 0, x: -20 }}
                transition={{
                  layout: { duration: 0.3 },
                  opacity: { duration: 0.2 },
                  y: { duration: 0.3 }
                }}
                whileHover={!clickedSuggestion ? { 
                  y: -2,
                  transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 10
                  }
                } : {}}
                whileTap={!clickedSuggestion ? { y: 1 } : {}}
                disabled={!!clickedSuggestion}
              >
                <div className="flex flex-row items-center size-full">
                  <div className="content-stretch flex items-center px-[16px] py-[12px] relative w-full">
                    <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
                      {suggestion.icon === "compass" && <CompassIcon color={secondaryTextColor} />}
                      {suggestion.icon === "paper" && <PaperIcon color={secondaryTextColor} />}
                      {suggestion.icon === "settings" && <SettingsIcon color={secondaryTextColor} />}
                      <div 
                        className="flex flex-col font-['CircularXX:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-nowrap"
                        style={{ color: secondaryTextColor }}
                      >
                        <p className="leading-none">{suggestion.text}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
}

function CompassIcon({ color }: { color: string }) {
  return (
    <div className="relative shrink-0 size-[20px]">
      <div className="absolute inset-[9.38%]">
        <div className="absolute inset-[-4.62%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.75 17.75">
            <g>
              <path d={svgPaths.p2438d980} stroke={color} strokeLinecap="square" strokeMiterlimit="10" strokeWidth="1.5" />
              <path d={svgPaths.p14e79500} stroke={color} strokeLinecap="square" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" />
              <path d={svgPaths.p244f8f00} fill={color} />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function PaperIcon({ color }: { color: string }) {
  return (
    <div className="relative shrink-0 size-[16px]">
      <div className="absolute left-0 overflow-clip size-[16px] top-0">
        <div className="absolute inset-[9.38%]">
          <div className="absolute inset-[-5.12%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.33 14.33">
              <g>
                <path d="M3.26461 4.26498H9.33128" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.33" />
                <path d="M3.26461 7.46499H6.33461" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.33" />
                <path d={svgPaths.p2c9ef900} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.33" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsIcon({ color }: { color: string }) {
  return (
    <div className="relative shrink-0 size-[16px]">
      <div className="absolute left-1/2 size-[14px] top-1/2 translate-x-[-50%] translate-y-[-50%]">
        <div className="absolute inset-[3.13%]">
          <div className="absolute inset-[-5.07%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.455 14.455">
              <g>
                <path d="M6.3525 2.415L13.79 2.415" stroke={color} strokeLinecap="round" strokeMiterlimit="10" strokeWidth="1.33" />
                <path d="M0.665 2.415H2.415" stroke={color} strokeLinecap="round" strokeMiterlimit="10" strokeWidth="1.33" />
                <path d="M12.04 7.2275L13.79 7.2275" stroke={color} strokeLinecap="round" strokeMiterlimit="10" strokeWidth="1.33" />
                <path d="M0.665 7.2275H8.1025" stroke={color} strokeLinecap="round" strokeMiterlimit="10" strokeWidth="1.33" />
                <path d={svgPaths.p2aefe000} stroke={color} strokeLinecap="square" strokeMiterlimit="10" strokeWidth="1.33" />
                <path d="M5.915 12.04L13.79 12.04" stroke={color} strokeLinecap="round" strokeMiterlimit="10" strokeWidth="1.33" />
                <path d="M0.665 12.04H2.415" stroke={color} strokeLinecap="round" strokeMiterlimit="10" strokeWidth="1.33" />
                <path d={svgPaths.p23e10540} stroke={color} strokeLinecap="square" strokeMiterlimit="10" strokeWidth="1.33" />
                <path d={svgPaths.p29169300} stroke={color} strokeLinecap="square" strokeMiterlimit="10" strokeWidth="1.33" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}