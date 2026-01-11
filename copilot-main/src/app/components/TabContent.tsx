import { motion } from "motion/react";
import { useState } from "react";

interface TabContentProps {
  tab: "chat" | "manual" | "statement";
  theme: "light" | "dark";
}

export default function TabContent({ tab, theme }: TabContentProps) {
  if (tab === "manual") {
    return <ManualScreen theme={theme} />;
  }
  
  if (tab === "statement") {
    return <StatementScreen theme={theme} />;
  }

  return null;
}

function ManualScreen({ theme }: { theme: "light" | "dark" }) {
  const isDark = theme === "dark";
  const textColor = isDark ? "white" : "#00071a";
  const secondaryTextColor = isDark ? "rgba(255,255,255,0.7)" : "#727e8e";
  const cardBg = isDark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.95)";
  const borderColor = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{
        duration: 0.3,
        ease: [0.4, 0.0, 0.2, 1]
      }}
      className="w-full h-full overflow-y-auto px-[24px] py-[20px]"
    >
      <div className="flex flex-col gap-[24px] max-w-[432px] mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-[8px]">
          <h1 
            className="font-['CircularXX:Medium',sans-serif] text-[24px] leading-[1.2]"
            style={{ color: textColor }}
          >
            Manual Adjustments
          </h1>
          <p 
            className="font-['CircularXX:Regular',sans-serif] text-[14px] leading-[1.4]"
            style={{ color: secondaryTextColor }}
          >
            Customize your accessibility settings
          </p>
        </div>

        {/* Vision Settings */}
        <div className="flex flex-col gap-[12px]">
          <h2 
            className="font-['CircularXX:Medium',sans-serif] text-[16px] leading-[1.2]"
            style={{ color: textColor }}
          >
            Vision
          </h2>
          
          <ToggleCard
            label="Increase Text Size"
            description="Make text larger for better readability"
            theme={theme}
          />
          <ToggleCard
            label="Highlight Links"
            description="Emphasize clickable elements"
            theme={theme}
          />
          <ToggleCard
            label="High Contrast"
            description="Improve visual distinction"
            theme={theme}
          />
        </div>

        {/* Navigation Settings */}
        <div className="flex flex-col gap-[12px]">
          <h2 
            className="font-['CircularXX:Medium',sans-serif] text-[16px] leading-[1.2]"
            style={{ color: textColor }}
          >
            Navigation
          </h2>
          
          <ToggleCard
            label="Keyboard Navigation"
            description="Navigate using keyboard shortcuts"
            theme={theme}
          />
          <ToggleCard
            label="Stop Animations"
            description="Reduce motion and auto-play"
            theme={theme}
          />
        </div>

        {/* Reading Settings */}
        <div className="flex flex-col gap-[12px]">
          <h2 
            className="font-['CircularXX:Medium',sans-serif] text-[16px] leading-[1.2]"
            style={{ color: textColor }}
          >
            Reading
          </h2>
          
          <ToggleCard
            label="Reading Guide"
            description="Highlight current line while reading"
            theme={theme}
          />
          <ToggleCard
            label="Dyslexia Friendly"
            description="Use specialized font"
            theme={theme}
          />
        </div>
      </div>
    </motion.div>
  );
}

function ToggleCard({ 
  label, 
  description, 
  theme 
}: { 
  label: string; 
  description: string; 
  theme: "light" | "dark";
}) {
  const [isOn, setIsOn] = useState(false);
  const isDark = theme === "dark";
  const textColor = isDark ? "white" : "#00071a";
  const secondaryTextColor = isDark ? "rgba(255,255,255,0.7)" : "#727e8e";
  const cardBg = isDark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.95)";
  const borderColor = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)";

  return (
    <div 
      className="flex items-center justify-between p-[16px] rounded-[12px] border backdrop-blur-[10px] transition-colors duration-200"
      style={{ 
        backgroundColor: cardBg,
        borderColor: borderColor
      }}
    >
      <div className="flex flex-col gap-[4px] flex-1">
        <div 
          className="font-['CircularXX:Medium',sans-serif] text-[14px] leading-[1.2]"
          style={{ color: textColor }}
        >
          {label}
        </div>
        <div 
          className="font-['CircularXX:Regular',sans-serif] text-[12px] leading-[1.3]"
          style={{ color: secondaryTextColor }}
        >
          {description}
        </div>
      </div>

      <motion.button
        onClick={() => setIsOn(!isOn)}
        className={`${
          isOn
            ? "bg-[#027D76]"
            : isDark ? "bg-[rgba(255,255,255,0.2)]" : "bg-[rgba(0,0,0,0.1)]"
        } w-[48px] h-[26px] rounded-[13px] flex items-center p-[2px] transition-colors duration-200`}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className={`size-[22px] rounded-full ${
            isOn ? "bg-white" : isDark ? "bg-[rgba(255,255,255,0.8)]" : "bg-white"
          }`}
          animate={{
            x: isOn ? 22 : 0
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30
          }}
        />
      </motion.button>
    </div>
  );
}

function StatementScreen({ theme }: { theme: "light" | "dark" }) {
  const isDark = theme === "dark";
  const textColor = isDark ? "white" : "#00071a";
  const secondaryTextColor = isDark ? "rgba(255,255,255,0.7)" : "#727e8e";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{
        duration: 0.3,
        ease: [0.4, 0.0, 0.2, 1]
      }}
      className="w-full h-full overflow-y-auto px-[24px] py-[20px]"
    >
      <div className="flex flex-col gap-[24px] max-w-[432px] mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-[12px] items-center text-center">
          <div className={`size-[60px] rounded-full flex items-center justify-center ${
            isDark ? "bg-[rgba(255,255,255,0.1)]" : "bg-[#f0f4f8]"
          }`}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path 
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                stroke={isDark ? "rgba(255,255,255,0.8)" : "#027D76"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          
          <h1 
            className="font-['CircularXX:Medium',sans-serif] text-[24px] leading-[1.2]"
            style={{ color: textColor }}
          >
            Accessibility Statement
          </h1>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-[16px]">
          <p 
            className="font-['CircularXX:Regular',sans-serif] text-[15px] leading-[1.6]"
            style={{ color: textColor }}
          >
            This website is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.
          </p>

          <p 
            className="font-['CircularXX:Regular',sans-serif] text-[15px] leading-[1.6]"
            style={{ color: textColor }}
          >
            Our website strives to conform to Level AA of the World Wide Web Consortium (W3C) Web Content Accessibility Guidelines 2.1 (WCAG 2.1).
          </p>

          <div className="flex flex-col gap-[12px] mt-[8px]">
            <h2 
              className="font-['CircularXX:Medium',sans-serif] text-[16px] leading-[1.2]"
              style={{ color: textColor }}
            >
              Measures
            </h2>
            <ul className="flex flex-col gap-[8px] list-disc pl-[20px]">
              <li 
                className="font-['CircularXX:Regular',sans-serif] text-[14px] leading-[1.5]"
                style={{ color: secondaryTextColor }}
              >
                Keyboard navigation support
              </li>
              <li 
                className="font-['CircularXX:Regular',sans-serif] text-[14px] leading-[1.5]"
                style={{ color: secondaryTextColor }}
              >
                Screen reader compatibility
              </li>
              <li 
                className="font-['CircularXX:Regular',sans-serif] text-[14px] leading-[1.5]"
                style={{ color: secondaryTextColor }}
              >
                High contrast modes
              </li>
              <li 
                className="font-['CircularXX:Regular',sans-serif] text-[14px] leading-[1.5]"
                style={{ color: secondaryTextColor }}
              >
                Text resizing capabilities
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-[12px] mt-[8px]">
            <h2 
              className="font-['CircularXX:Medium',sans-serif] text-[16px] leading-[1.2]"
              style={{ color: textColor }}
            >
              Feedback
            </h2>
            <p 
              className="font-['CircularXX:Regular',sans-serif] text-[14px] leading-[1.5]"
              style={{ color: secondaryTextColor }}
            >
              We welcome your feedback on the accessibility of this website. Please let us know if you encounter any accessibility barriers.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}