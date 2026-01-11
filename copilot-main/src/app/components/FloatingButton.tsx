import { motion } from "motion/react";
import WidgetIcon from "../../imports/WidgetIcon";

interface FloatingButtonProps {
  onClick: () => void;
  isHidden: boolean;
}

export default function FloatingButton({ onClick, isHidden }: FloatingButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="fixed z-50 size-[100px] cursor-pointer"
      style={{
        bottom: "24px",
        right: "24px",
      }}
      initial={{ 
        scale: 0, 
        opacity: 0,
        x: isHidden ? 60 : 0
      }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        x: isHidden ? 60 : 0
      }}
      exit={{ 
        scale: 0.8, 
        opacity: 0,
        transition: {
          duration: 0.2,
          ease: [0.4, 0.0, 0.2, 1]
        }
      }}
      whileHover={{ 
        scale: 1.05,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 10
        }
      }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
    >
      <WidgetIcon />
    </motion.button>
  );
}
