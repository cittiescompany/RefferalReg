'use client'

import React from "react";
import AccountSetupForm from "./AccountSetupForm";
import useParamHook from "@/hooks/use-param-hook";
import SuccessPage from "./SuccessPage";

const AccoutSetupMainPage = () => {
  const { mode } = useParamHook({key: "is_success"});
  return (
    <div >
      {mode && <SuccessPage />}
      {!mode && <AccountSetupForm />}
    </div>
  );
};

export default AccoutSetupMainPage;
