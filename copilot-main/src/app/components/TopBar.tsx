import { motion } from "motion/react";
import { useRef, useState, useLayoutEffect } from "react";
import svgPaths from "../../imports/svg-7qj6ackrj5";

// Paths from WelcomeScreenLightModeOpenSettings.tsx / svg-9e7cvekjhi.ts
const settingsPaths = {
  language: {
    p1: "M22.5 20.2506L17.25 9.75058L12 20.2506", // p1e16c900
    p2: "M13.4999 17.2506H20.9999",
    p3: "M9.00005 3.0004V5.2504",
    p4: "M3.00014 5.25076H15.0001",
    p5: "M12.0001 5.25076C12.0001 7.63771 11.0519 9.9269 9.3641 11.6147C7.67627 13.3026 5.38709 14.2508 3.00014 14.2508", // p358d8180
    p6: "M6.51256 8.25049C7.13305 10.0055 8.28246 11.5249 9.80246 12.5995C11.3225 13.6741 13.1383 14.2509 14.9997 14.2505", // p2704cf00
  },
  hide: {
    p1: "M4.21875 3.51562L18.2812 18.9844", // p1595d80
    p2: "M13.6153 13.8517C12.9253 14.4789 12.0144 14.8064 11.0829 14.7621C10.1515 14.7177 9.27582 14.3052 8.64855 13.6152C8.02128 12.9253 7.69379 12.0144 7.73813 11.0829C7.78247 10.1515 8.195 9.2758 8.88498 8.64853", // p2db54a00
    p3: "M11.9119 7.79663C12.6593 7.93976 13.3401 8.32155 13.8521 8.88465C14.364 9.44775 14.6793 10.1617 14.7508 10.9194", // pda3c580
    p4: "M18.3349 14.8623C20.2509 13.1467 21.0938 11.25 21.0938 11.25C21.0938 11.25 18.2813 4.92189 11.25 4.92189C10.6411 4.92105 10.0332 4.97044 9.43245 5.06954", // p386b5bc0
    p5: "M6.50391 6.02921C2.92061 7.84327 1.40625 11.2499 1.40625 11.2499C1.40625 11.2499 4.21875 17.578 11.25 17.578C12.8975 17.591 14.5244 17.2113 15.9961 16.4706", // p3001d600
  },
  moon: "M13.411 5.78027C14.6462 5.78035 15.7963 6.14194 16.7639 6.76316C16.8365 6.80977 16.8168 6.91993 16.7339 6.94383C14.5383 7.57703 12.9326 9.60047 12.9325 12C12.9325 14.3996 14.5383 16.4229 16.7339 17.0562C16.8168 17.0801 16.8365 17.1902 16.7639 17.2368C15.7963 17.8581 14.6462 18.2197 13.411 18.2197C9.97602 18.2197 7.19128 15.4351 7.19127 12C7.19127 8.56487 9.97602 5.78027 13.411 5.78027Z", // p2f5f2200
  sunRing: "M8 11.5C9.933 11.5 11.5 9.933 11.5 8C11.5 6.067 9.933 4.5 8 4.5C6.067 4.5 4.5 6.067 4.5 8C4.5 9.933 6.067 11.5 8 11.5Z", // p121c4800
};

interface TopBarProps {
  onClose: () => void;
  activeTab: "chat" | "manual" | "statement";
  onTabChange: (tab: "chat" | "manual" | "statement") => void;
  isSettingsOpen: boolean;
  onSettingsToggle: () => void;
  theme: "light" | "dark";
  onLanguageClick: () => void;
  onHideClick: () => void;
  onThemeToggle: () => void;
  selectedLanguage: string;
}

export default function TopBar({ 
  onClose, 
  activeTab, 
  onTabChange, 
  isSettingsOpen, 
  onSettingsToggle,
  theme,
  onLanguageClick,
  onHideClick,
  onThemeToggle,
  selectedLanguage
}: TopBarProps) {
  const isDark = theme === "dark";
  const textColor = isDark ? "white" : "#00071A";
  const inactiveColor = isDark ? "#8B96A3" : "#727E8E";
  
  // Refs to calculate tab positions dynamically
  const chatTabRef = useRef<HTMLButtonElement>(null);
  const manualTabRef = useRef<HTMLButtonElement>(null);
  const statementTabRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [tabPositions, setTabPositions] = useState<{ chat: number; manual: number; statement: number } | null>(null);
  
  // Calculate positions on mount and when activeTab changes
  useLayoutEffect(() => {
    const calculatePositions = () => {
      if (chatTabRef.current && manualTabRef.current && statementTabRef.current && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const chatRect = chatTabRef.current.getBoundingClientRect();
        const manualRect = manualTabRef.current.getBoundingClientRect();
        const statementRect = statementTabRef.current.getBoundingClientRect();
        
        setTabPositions({
          chat: chatRect.left - containerRect.left,
          manual: manualRect.left - containerRect.left,
          statement: statementRect.left - containerRect.left
        });
      }
    };

    calculatePositions();
    
    // Recalculate on resize or zoom
    window.addEventListener('resize', calculatePositions);
    return () => window.removeEventListener('resize', calculatePositions);
  }, [activeTab, isSettingsOpen]); // Recalculate when settings open state changes too

  return (
    <div className="relative shrink-0 w-full px-0 pb-[8px]">
      <div className="content-stretch flex gap-[20px] items-start relative w-full" style={{ paddingLeft: '12px' }}>
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="content-stretch flex items-start relative rounded-[6px] shrink-0 hover:bg-black/5 active:bg-black/10 transition-colors p-1"
        >
          <div className="content-stretch flex items-start p-[4px] relative rounded-[5px] shrink-0">
            <div className="relative shrink-0 size-[16px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                <g id="close button">
                  <path 
                    d={svgPaths.p1e8f7160} 
                    stroke={textColor} 
                    strokeLinecap="round" 
                    strokeWidth="1.32" 
                  />
                  <path 
                    d={svgPaths.p3d200900} 
                    stroke={textColor} 
                    strokeLinecap="round" 
                    strokeWidth="1.32" 
                  />
                </g>
              </svg>
            </div>
          </div>
        </button>

        {/* Main Menu and Settings */}
        <div className="basis-0 content-stretch flex grow items-end justify-center gap-[8px] min-h-px min-w-px relative shrink-0 overflow-visible">
          
          {/* Tab Menu - Animated visibility */}
          <motion.div 
            ref={containerRef}
            className={`${
              isDark ? "bg-[rgba(255,255,255,0.1)]" : "bg-white"
            } content-stretch flex gap-[12px] items-center justify-center pr-[8px] py-[5px] relative rounded-[13px] shadow-[0px_0px_0.5px_0px_rgba(0,0,0,0.3),0px_1px_3px_0px_rgba(0,0,0,0.15)] shrink-0 transition-colors duration-300`}
            animate={{
              x: isSettingsOpen ? 0 : 190,
              paddingLeft: isSettingsOpen ? 8 : 40,
            }}
            transition={{
              ease: [0.4, 0.0, 0.2, 1],
              duration: 0.3
            }}
          >
                {/* Sliding active tab indicator */}
                <motion.div
                  className={`absolute ${
                    isDark ? "bg-white" : "bg-[#00071a]"
                  } rounded-[8px] transition-colors duration-200`}
                  style={{
                    height: "calc(100% - 10px)",
                    width: "55px",
                    top: "6px",
                    transform: "translateX(5px)",
                    left: "-1px"
                  }}
                  animate={{
                    x: tabPositions ? tabPositions[activeTab] : 0
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30
                  }}
                />

                {/* Chat Tab */}
                <motion.button
                  ref={chatTabRef}
                  onClick={() => onTabChange("chat")}
                  className="content-stretch flex flex-col gap-[3px] items-center px-0 py-[5px] relative rounded-[8px] shrink-0 z-10"
                  whileHover={{ scale: activeTab === "chat" ? 1 : 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChatIcon active={activeTab === "chat"} theme={theme} />
                  <div className={`flex flex-col font-['CircularXX:Medium',sans-serif] justify-end leading-[0] not-italic relative shrink-0 text-[12px] text-center ${
                    activeTab === "chat" 
                      ? isDark ? "text-[#00071a]" : "text-white" 
                      : `text-[${inactiveColor}]`
                  } w-[55px] transition-colors duration-200`}>
                    <p className="leading-none">Chat</p>
                  </div>
                </motion.button>

                {/* Manual Tab */}
                <motion.button
                  ref={manualTabRef}
                  onClick={() => onTabChange("manual")}
                  className="content-stretch flex flex-col gap-[3px] items-center relative shrink-0 z-10"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <AdjustmentsIcon active={activeTab === "manual"} strokeColor={activeTab === "manual" ? (isDark ? "#00071a" : "white") : inactiveColor} />
                  <div className={`flex flex-col font-['CircularXX:Medium',sans-serif] justify-end leading-[0] not-italic relative shrink-0 text-[12px] text-center w-[55px] transition-colors duration-200`}
                    style={{ color: activeTab === "manual" ? (isDark ? "#00071a" : "white") : inactiveColor }}
                  >
                    <p className="leading-none">Manual</p>
                  </div>
                </motion.button>

                {/* Statement Tab */}
                <motion.button
                  ref={statementTabRef}
                  onClick={() => onTabChange("statement")}
                  className="content-stretch flex flex-col gap-[3px] items-center relative shrink-0 z-10"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <StatementIcon active={activeTab === "statement"} strokeColor={activeTab === "statement" ? (isDark ? "#00071a" : "white") : inactiveColor} />
                  <div className={`flex flex-col font-['CircularXX:Medium',sans-serif] justify-end leading-[0] not-italic relative shrink-0 text-[12px] text-center text-nowrap transition-colors duration-200`}
                    style={{ color: activeTab === "statement" ? (isDark ? "#00071a" : "white") : inactiveColor }}
                  >
                    <p className="leading-none">Statement</p>
                  </div>
                </motion.button>
          </motion.div>

          {/* Settings Menu - Always visible */}
          <motion.div 
            className={`${
              isDark ? "bg-[rgba(255,255,255,0.1)]" : "bg-white"
            } content-stretch flex gap-[12px] items-center justify-center pl-[40px] pr-[8px] py-[5px] relative rounded-[13px] shadow-[0px_0px_0.5px_0px_rgba(0,0,0,0.3),0px_1px_3px_0px_rgba(0,0,0,0.15)] shrink-0 transition-colors duration-300`}
          >
            {/* Settings Button - positioned absolutely over settings menu */}
            <motion.button
              onClick={onSettingsToggle}
              className="h-[65px] absolute shrink-0 w-[26px] overflow-visible"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                x: isSettingsOpen ? 0 : -13,
              }}
              transition={{
                type: "",
                stiffness: 4,
                damping: 30
              }}
              style={{
                right: 0,
                top: 0,
                zIndex: 20,
                clipPath: ""
              }}
            >
              <div className="absolute top-[-3.08%] bottom-[-6.15%] left-0 right-0">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 71">
                  <g>
                    <g filter="url(#filter0_dd_settings)">
                      <path d={svgPaths.p2b2ac280} fill={isDark ? "rgba(255,255,255,0.1)" : "white"} />
                    </g>
                    {/* FIX #6: Morphing dots to chevron */}
                    <g>
                      {/* Top dot/line */}
                      <motion.line
                        x1="13.5"
                        y1="28.5"
                        x2="13.5"
                        y2="28.5"
                        stroke={isDark ? "white" : "#00071A"}
                        strokeWidth="3"
                        strokeLinecap="round"
                        animate={{
                          x2: isSettingsOpen ? 17.5 : 13.5,
                          y2: isSettingsOpen ? 24.5 : 28.5
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 25
                        }}
                      />
                      {/* Middle dot - moves to tip */}
                      <motion.circle
                        cx="13.5"
                        cy="34.5"
                        r="1.5"
                        fill={isDark ? "white" : "#00071A"}
                        animate={{
                          cx: isSettingsOpen ? 18.5 : 13.5,
                          cy: isSettingsOpen ? 34.5 : 34.5,
                          opacity: isSettingsOpen ? 0 : 1
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 25
                        }}
                      />
                      {/* Arrow tip when open */}
                      <motion.circle
                        cx="18.5"
                        cy="34.5"
                        r="1.5"
                        fill={isDark ? "white" : "#00071A"}
                        animate={{
                          opacity: isSettingsOpen ? 1 : 0
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 25
                        }}
                      />
                      {/* Bottom dot/line */}
                      <motion.line
                        x1="13.5"
                        y1="40.5"
                        x2="13.5"
                        y2="40.5"
                        stroke={isDark ? "white" : "#00071A"}
                        strokeWidth="3"
                        strokeLinecap="round"
                        animate={{
                          x2: isSettingsOpen ? 17.5 : 13.5,
                          y2: isSettingsOpen ? 44.5 : 40.5
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 25
                        }}
                      />
                    </g>
                  </g>
                  <defs>
                    <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="71" id="filter0_dd_settings" width="32" x="0" y="0">
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                      <feOffset dy="1" />
                      <feGaussianBlur stdDeviation="1.5" />
                      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                      <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_settings" />
                      <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                      <feOffset />
                      <feGaussianBlur stdDeviation="0.25" />
                      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
                      <feBlend in2="effect1_dropShadow_settings" mode="normal" result="effect2_dropShadow_settings" />
                      <feBlend in="SourceGraphic" in2="effect2_dropShadow_settings" mode="normal" result="shape" />
                    </filter>
                  </defs>
                </svg>
              </div>
            </motion.button>
                 {/* Language Button */}
                 <motion.button
                  onClick={onLanguageClick}
                  className="content-stretch flex flex-col gap-[3px] items-center px-0 py-[5px] relative rounded-[8px] shrink-0 z-10"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <LanguageIcon color={inactiveColor} />
                  <div className={`flex flex-col font-['CircularXX:Medium',sans-serif] justify-end leading-[0] not-italic relative shrink-0 text-[12px] text-center text-[${inactiveColor}] w-[55px] transition-colors duration-200`}>
                    <p className="leading-none">Language</p>
                  </div>
                </motion.button>

                {/* Hide Button */}
                <motion.button
                  onClick={onHideClick}
                  className="content-stretch flex flex-col gap-[3px] items-center px-0 py-[5px] relative rounded-[8px] shrink-0 z-10"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <HideIcon color={inactiveColor} />
                  <div className={`flex flex-col font-['CircularXX:Medium',sans-serif] justify-end leading-[0] not-italic relative shrink-0 text-[12px] text-center text-[${inactiveColor}] w-[55px] transition-colors duration-200`}>
                    <p className="leading-none">Hide</p>
                  </div>
                </motion.button>

                 {/* Theme Button */}
                 <motion.button
                  onClick={onThemeToggle}
                  className="content-stretch flex flex-col gap-[3px] items-center px-0 py-[5px] relative rounded-[8px] shrink-0 z-10"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                   <div className="content-stretch flex items-center justify-center overflow-clip p-[2px] relative size-[30px]">
                      {/* Animated Toggle Icon */}
                      <div className="bg-[rgba(10,37,64,0.1)] content-stretch flex items-center justify-center p-[2px] relative rounded-[8px] size-full overflow-hidden">
                        <motion.div
                           key={theme}
                           initial={{ rotate: -90, opacity: 0 }}
                           animate={{ rotate: 0, opacity: 1 }}
                           transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            {isDark ? <MoonIcon /> : <SunIcon />}
                        </motion.div>
                      </div>
                   </div>
                  <div className={`flex flex-col font-['CircularXX:Medium',sans-serif] justify-end leading-[0] not-italic relative shrink-0 text-[12px] text-center text-[${inactiveColor}] w-[55px] transition-colors duration-200`}>
                    <p className="leading-none">{isDark ? "Light UI" : "Dark UI"}</p>
                  </div>
                </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ChatIcon({ active, theme }: { active: boolean; theme: "light" | "dark" }) {
  const strokeColor = active ? (theme === "dark" ? "#00071A" : "white") : (theme === "dark" ? "#8B96A3" : "#727E8E");
  const fillColor = active ? (theme === "dark" ? "#00071A" : "white") : (theme === "dark" ? "#8B96A3" : "#727E8E");

  return (
    <div className="overflow-clip relative shrink-0 size-[30px]">
      <div className="absolute h-[23.155px] left-[3.5px] top-[2.84px] w-[23.5px]">
        <div className="absolute inset-[0_0_-2.21%_-3.19%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.25 23.6659">
            <g>
              <path d={svgPaths.p14259fc0} stroke={strokeColor} strokeLinecap="round" strokeWidth="1.5" />
              <path d={svgPaths.p9202f00} fill={fillColor} />
              <path d={svgPaths.p5376900} stroke={strokeColor} strokeLinecap="round" strokeWidth="1.5" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function AdjustmentsIcon({ active, strokeColor }: { active: boolean; strokeColor: string }) {
  return (
    <div className="relative rounded-[6.563px] shrink-0 size-[30px]">
      <div className="absolute inset-[30%_25.55%_28.52%_23.75%]">
        <div className="absolute inset-[-6.03%_-4.93%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.7109 13.9453">
            <g>
              <path d={svgPaths.p25794200} stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              <path d={svgPaths.pe477b00} stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              <path d="M8.35547 2.82422H15.9609" stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              <path d="M0.75 2.82422H4.20703" stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              <path d="M13.8867 11.1211H15.9609" stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              <path d="M0.75 11.1211H9.73828" stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function StatementIcon({ active, strokeColor }: { active: boolean; strokeColor: string }) {
  return (
    <div className="relative shrink-0 size-[30px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <g clipPath="url(#clip0_statement)">
          <g>
            <mask height="30" id="mask0_statement_2" maskUnits="userSpaceOnUse" style={{ maskType: "luminance" }} width="30" x="1" y="1">
              <path d={svgPaths.p1ef28100} fill="white" />
            </mask>
            <g mask="url(#mask0_statement_2)">
              <path d={svgPaths.p6c2da80} stroke={strokeColor} strokeWidth="1.5" />
            </g>
          </g>
          <g>
            <mask height="30" id="mask1_statement_1" maskUnits="userSpaceOnUse" style={{ maskType: "luminance" }} width="30" x="1" y="1">
              <path d={svgPaths.p37198c00} fill="white" />
            </mask>
            <g mask="url(#mask1_statement_1)">
              <path d={svgPaths.p29403e80} stroke={strokeColor} strokeWidth="1.5" />
            </g>
          </g>
          <g>
            <path d={svgPaths.p15043200} fill={strokeColor} />
            <path d={svgPaths.p336a6c00} fill={strokeColor} />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_statement">
            <rect fill="white" height="30" width="30" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function LanguageIcon({ color }: { color: string }) {
  return (
    <div className="relative shrink-0 size-[24px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g>
          <path d={settingsPaths.language.p1} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={settingsPaths.language.p2} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={settingsPaths.language.p3} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={settingsPaths.language.p4} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={settingsPaths.language.p5} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={settingsPaths.language.p6} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function HideIcon({ color }: { color: string }) {
  return (
    <div className="relative shrink-0 size-[22.5px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.5 22.5">
        <g>
          <path d={settingsPaths.hide.p1} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={settingsPaths.hide.p2} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={settingsPaths.hide.p3} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={settingsPaths.hide.p4} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={settingsPaths.hide.p5} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function MoonIcon() {
  return (
    <div className="relative size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <path d={settingsPaths.moon} fill="#00071A" />
      </svg>
    </div>
  );
}

function SunIcon() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g>
          <path d="M8 2.5V1" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
          <path d={settingsPaths.sunRing} fill="white" />
          <path d="M4 4L3 3" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 12L3 13" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 4L13 3" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 12L13 13" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2.5 8H1" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 13.5V15" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13.5 8H15" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}