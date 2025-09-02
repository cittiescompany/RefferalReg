"use client";

import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import useParamHook from "@/hooks/use-param-hook";
import Link from "next/link";
import clientApi from "@/lib/clientApi";
import { toast } from "react-toastify";
import useFormHook from "@/hooks/use-form-hook";

const OtpScreen = () => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");
  const {router} = useParamHook();
  const {otpEmail, otpPhoneNumber} = useFormHook();
  
  const handleChange = (value: string) => {
    setOtp(value);
  };
  
  
  
  
  const handleSubmit = async () => {
    setIsLoading(true);
    const otpData = Number(otp);

    const data = {
      identity: otpPhoneNumber,
      otp: String(otpData),
    };
    
    if (typeof otpData !== "number" || isNaN(otpData)) {
      setMsg("Please input numbers only");
      setTimeout(() => {
        setIsLoading(false);
        setOtp("");
        setMsg("");
      }, 2000);
    }
    const response = await clientApi.post(
      "/register/account_verification",
      data
    );
    console.log(response.data.status);
    if (response.data.status) {
      router.push("/setup");
      toast.success(response.data.message || "✅ OTP verified successfully!");
    } else {
      setOtp("");
      toast.error(response.data.message|| "Otp verification process failed");
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  useEffect(() => {
    if (otp.length === 6) {
      handleSubmit();
    }
  }, [otp]);


  return (
    <div className=" w-full mx-auto  text-center space-y-6">
      <div className="space-y-3 pl-3 font-normal text-xs text-gray-600 w-full">
        <h2 className="text-xl text-start font-bold">Verify your account</h2>
        <p className="text-sm text-start mt-2">
          A 6 digit OTP code has been sent to your phone number or email
          address, enter the code below to verify your account
        </p>
      </div>
      {otpEmail && (
        <div className="pl-3 font text-center mt-10">
          OTP code sent to :{" "}
          <span className="text-blue-500 underline">{otpEmail}</span>{" "}
        </div>
      )}
      <div className="pl-3 font-medium text-start mt-3">Enter OTP code</div>
      <OtpInput
        value={otp}
        onChange={handleChange}
        numInputs={6}
        renderInput={(props) => (
          <input
            {...props}
            style={{
              width: "4.5rem",
              height: "4.5rem",
              fontSize: "2.8rem",
              textAlign: "center",
              border: "1px solid #ccc",
              borderRadius: "0.375rem",
            }}
            type="password"
            className="font-bold bg-[#F4F4F4] focus-visible:ring-1 focus-visible:ring-gray-700 focus:outline-none"
          />
        )}
        shouldAutoFocus
        containerStyle={{ justifyContent: "center", gap: "1.0rem" }}
      />
      {msg && <div className="text-red-500 text-start">{msg}</div>}
      <Button
        onClick={handleSubmit}
        className="w-full h-12 bg-[#3561D3] hover:bg-[#36624D]"
        disabled={otp.length < 6}
      >
        {isLoading && <Loader className="animate-spin" />}

        {isLoading ? "Submitting..." : "Continue"}
      </Button>

      <div className="text-sm text-start font-semibold">
        <Link
          href={"#"}
          className="text-gray-500 hover:underline hover:text-[#3561D3] font-normal cursor-pointer"
        >
          Resent OTP
        </Link>
      </div>
    </div>
  );
};

export default OtpScreen;
