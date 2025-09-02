'use client'

import { CheckCircle2 } from "lucide-react";
import React from "react";
import StoreButtons from "./StoreButtons";

const SuccessPage = () => {
  return (
    <div className="w-full bg-[#3561D3]">
      <div className="flex w-full bg-[#3561D3] items-center justify-center p-0">
        <div className="w-full rounded-2xl bg-white p-8 shadow-lg text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <CheckCircle2 className="h-20 w-20 text-green-500" />
          </div>

          {/* Title */}
          <h2 className="text-lg font-semibold text-gray-900">
            Congratulations, your account is now active
          </h2>

          {/* Subtitle */}
          <p className="mt-2 text-sm text-gray-600">
           Download the app to join others in your community and also get your referral perks as well
          </p>

          {/* Button */}
        <StoreButtons/>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
