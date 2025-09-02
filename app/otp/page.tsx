import OtpScreen from "@/components/OtpScreen";
import React, { Suspense } from "react";

const OtpPage = () => {
  return (
    <div className="max-w-xl mx-auto mt-32 p-6 bg-white rounded-2xl shadow">
      <Suspense fallback={null}>
        <OtpScreen />
      </Suspense>
    </div>
  );
};

export default OtpPage;
