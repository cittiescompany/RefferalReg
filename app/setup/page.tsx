import AccoutSetupMainPage from "@/components/AccoutSetupMainPage";
import React, { Suspense } from "react";

const AccountSetupPage = () => {
  return (
    <div className="max-w-xl mx-auto mt-16 p-6 bg-white rounded-2xl shadow">
      <Suspense fallback={null}>
        <AccoutSetupMainPage />
      </Suspense>
    </div>
  );
};

export default AccountSetupPage;
