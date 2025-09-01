"use client";

import React, { Suspense, useState } from "react";
import ReferralSubPage from "./ReferralSubPage";
import { motion, AnimatePresence } from "framer-motion";

const RegistrationMainPage = () => {
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
        <Suspense fallback={null}>
          <ReferralSubPage />
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
};

export default RegistrationMainPage;
