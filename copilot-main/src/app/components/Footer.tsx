import { motion } from "motion/react";
import svgPaths from "../../imports/svg-7qj6ackrj5";

interface FooterProps {
  theme: "light" | "dark";
}

export default function Footer({ theme }: FooterProps) {
  const isDark = theme === "dark";
  const textColor = isDark ? "rgba(255,255,255,0.6)" : "#3a4b61";

  return (
    <div className="h-[10px] relative shrink-0 w-[448px] opacity-80">
      <div className="flex flex-col items-center justify-end size-full">
        <div className="content-stretch flex flex-col items-center justify-end pb-0 pt-[16px] px-0 relative size-full">
          <div className="relative shrink-0 w-full">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex gap-[45px] items-center justify-center pl-[50px] pr-[30px] py-0 relative w-full">
                {/* Footer Text */}
                <div className="content-stretch flex items-center justify-between relative shrink-0 w-[251px]">
                  <p 
                    className="font-['CircularXX:Medium',sans-serif] h-[10px] leading-[12px] not-italic relative shrink-0 text-[12px] w-[164px]"
                    style={{ color: textColor }}
                  >
                    Web Accessibility Solution By
                  </p>
                  <Logo color={textColor} />
                </div>

                {/* Learn More */}
                <motion.button
                  onClick={() => window.open('https://accessibe.com', '_blank')}
                  className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 hover:opacity-70 transition-opacity"
                  whileHover={{ x: 2 }}
                >
                  <div 
                    className="[grid-area:1_/_1] flex flex-col font-['CircularXX:Medium',sans-serif] h-[11px] justify-center ml-0 mt-[5.5px] not-italic relative text-[12px] translate-y-[-50%] w-[77px]"
                    style={{ color: textColor }}
                  >
                    <p className="leading-[16.178px]">Learn More</p>
                  </div>
                  <div className="[grid-area:1_/_1] h-[6.5px] ml-[69px] mt-[3px] relative w-[3.25px]">
                    <div className="absolute inset-[-8.16%_-32.64%_-8.16%_-16.32%]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.84099 7.56066">
                        <path d={svgPaths.p16e15480} stroke={textColor} strokeWidth="1.5" />
                      </svg>
                    </div>
                  </div>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Logo({ color }: { color: string }) {
  return (
    <div className="h-[11.078px] relative shrink-0 w-[81px]">
      {/* accessiBe text */}
      <div className="absolute inset-[0.98%_0.2%_1.19%_17.15%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 66.9436 10.8382">
          <g>
            <path d={svgPaths.p2ed32600} fill={color} />
            <path d={svgPaths.p22424300} fill={color} />
            <path d={svgPaths.p172aac00} fill={color} />
            <path d={svgPaths.p29f69880} fill={color} />
            <path d={svgPaths.p4b0c540} fill={color} />
            <path d={svgPaths.p129e3300} fill={color} />
            <path d={svgPaths.pd12b200} fill={color} />
            <path d={svgPaths.p1a771d80} fill={color} />
            <path d={svgPaths.p140d4b00} fill={color} />
          </g>
        </svg>
      </div>
      {/* Logo Symbol */}
      <div className="absolute inset-[0_85.65%_0.6%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6234 11.0119">
          <g>
            <path d={svgPaths.p539ce00} fill={color} />
            <path d={svgPaths.p30368c80} fill={color} />
          </g>
        </svg>
      </div>
    </div>
  );
}