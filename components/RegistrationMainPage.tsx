// "use client";

import React, { Suspense } from "react";
import ReferralSubPage from "./ReferralSubPage";
// import { motion, AnimatePresence } from "framer-motion";
// import { slideVariants } from "@/lib/helpers";

const RegistrationMainPage = () => {
  // const [currentIndex] = useState<number>(0);
  // const [direction] = useState<number>(1);

  return (
    <Suspense fallback={null}>
        {/* <AnimatePresence custom={1} mode="wait"> */}
        {/* <motion.div
          key={1}
          custom={1}
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        > */}
          <ReferralSubPage />
        {/* </motion.div> */}
        {/* </AnimatePresence> */}
      </Suspense>
  );
};

export default RegistrationMainPage;
