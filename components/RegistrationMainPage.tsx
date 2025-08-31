"use client";

import useParamHook from "@/hooks/use-param-hook";
import React, { useState } from "react";
import ReferralSubPage from "./ReferralSubPage";
import BusinessSubPage from "./BusinessSubPage";
import { motion, AnimatePresence } from "framer-motion";

const RegistrationMainPage = () => {
  const { mode } = useParamHook({ key: "reg_type" });
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);

  const slideVariants = {
    initial: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.2 },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      transition: { duration: 0.2 },
    }),
  };

  return (
    <AnimatePresence custom={direction} mode="wait">
      <motion.div
        key={currentIndex}
        custom={direction}
        variants={slideVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
         <ReferralSubPage />
      </motion.div>
    </AnimatePresence>
  );
};

export default RegistrationMainPage;
