import svgPaths from "./svg-z4hlkjw72y";

export default function WidgetIcon() {
  return (
    <div className="relative size-full" data-name="widget icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 100 100">
        <g clipPath="url(#clip0_1_3147)" id="widget icon">
          <g data-figma-bg-blur-radius="20" filter="url(#filter0_ddd_1_3147)" id="back">
            <circle cx="50" cy="45" fill="var(--fill-0, white)" fillOpacity="0.8" r="35" shapeRendering="crispEdges" />
            <circle cx="50" cy="45" r="34.5" shapeRendering="crispEdges" stroke="url(#paint0_linear_1_3147)" />
          </g>
          <g id="xseb icon">
            <path d={svgPaths.p146bec80} fill="var(--fill-0, #00071A)" />
            <path d={svgPaths.p39177980} fill="var(--fill-0, #00071A)" />
          </g>
          <g filter="url(#filter1_d_1_3147)" id="xseb icon_2">
            <path d={svgPaths.p17dcc00} fill="var(--fill-0, #00071A)" shapeRendering="crispEdges" />
            <path d={svgPaths.p2de631d8} shapeRendering="crispEdges" stroke="var(--stroke-0, white)" strokeOpacity="0.8" />
          </g>
        </g>
        <defs>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="119" id="filter0_ddd_1_3147" width="110" x="-5" y="-10">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feOffset dy="9" />
            <feGaussianBlur stdDeviation="10" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
            <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_3147" />
            <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feMorphology in="SourceAlpha" operator="dilate" radius="1" result="effect2_dropShadow_1_3147" />
            <feOffset />
            <feGaussianBlur stdDeviation="3.5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.09 0" />
            <feBlend in2="effect1_dropShadow_1_3147" mode="normal" result="effect2_dropShadow_1_3147" />
            <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feMorphology in="SourceAlpha" operator="dilate" radius="1" result="effect3_dropShadow_1_3147" />
            <feOffset />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.11 0" />
            <feBlend in2="effect2_dropShadow_1_3147" mode="normal" result="effect3_dropShadow_1_3147" />
            <feBlend in="SourceGraphic" in2="effect3_dropShadow_1_3147" mode="normal" result="shape" />
          </filter>
          <clipPath id="bgblur_1_1_3147_clip_path" transform="translate(5 10)">
            <circle cx="50" cy="45" r="35" />
          </clipPath>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="30" id="filter1_d_1_3147" width="28.9997" x="58.0001" y="7">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feOffset />
            <feGaussianBlur stdDeviation="2.5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
            <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_3147" />
            <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_3147" mode="normal" result="shape" />
          </filter>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_3147" x1="29" x2="67" y1="16.5" y2="77">
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <clipPath id="clip0_1_3147">
            <rect fill="white" height="100" width="100" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}