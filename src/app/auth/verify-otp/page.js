"use client";

import { useState, useRef, useEffect } from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/context/AuthContext";
import { resendOTPCall, verifyOTPCall } from "@/services/auth";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import { toast } from "react-toastify";

export default function OTPVerification() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [loading, setLoading] = useState(false);
  const inputs = useRef([]);

  const { user } = useAuth();
  const { push } = useRouter();

  useEffect(() => {
    if (timeLeft > 0 && !success) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, success]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    setError("");

    // Focus next input
    if (element.value && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputs.current[index - 1].focus();
      }
      setOtp([...otp.map((d, idx) => (idx === index ? "" : d))]);
      setError("");
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    if (!/^\d+$/.test(pastedData)) return;

    const pastedArray = pastedData.slice(0, 6).split("");
    setOtp([...pastedArray, ...new Array(6 - pastedArray.length).fill("")]);
    inputs.current[Math.min(pastedArray.length, 5)].focus();
  };

  const verifyOTP = async () => {
    const enteredOTP = otp.join("");
    if (enteredOTP.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    try {
      await verifyOTPCall({ token: enteredOTP });
      setSuccess(true);
      setError("");
      setTimeout(() => {
        push("/auth/login");
      }, 2000);
    } catch (error) {
      console.error(error);
      setError("Invalid verification code");
    }
  };

  const resendOTP = async () => {
    setTimeLeft(60);
    setError("");
    // Add your resend OTP logic here
    try {
      await resendOTPCall({ emailAddress: user.emailAddress });
      toast("OTP Resent Successfully");
    } catch (error) {
      console.error(error);
      toast("Failed to Resend OTP... Please Try Again Shortly");
      setTimeLeft(60);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F1C] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-[#131B2C] rounded-2xl p-8 shadow-xl border border-gray-800">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">
              Verify Your Email
            </h2>
            <p className="text-gray-400">
              We've sent a verification code to your email
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex justify-center gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  ref={(ref) => (inputs.current[index] = ref)}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                  className={`w-12 h-14 text-center text-xl font-semibold rounded-xl
                    bg-[#0B0F1C] border-2 focus:ring-2 transition-all
                    ${
                      error
                        ? "border-red-500 focus:ring-red-500"
                        : success
                        ? "border-green-500 focus:ring-green-500"
                        : "border-gray-700 focus:ring-blue-500"
                    }
                    text-white focus:outline-none`}
                  aria-label={`Digit ${index + 1}`}
                />
              ))}
            </div>

            {error && (
              <div className="flex items-center justify-center gap-2 text-red-500">
                <XCircleIcon className="w-5 h-5" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="flex items-center justify-center gap-2 text-green-500">
                <CheckCircleIcon className="w-5 h-5" />
                <span>Verification successful!</span>
              </div>
            )}

            <button
              onClick={verifyOTP}
              disabled={success}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loading /> : "Verify Code"}
            </button>

            <div className="text-center">
              <p className="text-gray-400 text-sm mb-2">
                Didn't receive the code?
              </p>
              {timeLeft > 0 ? (
                <p className="text-gray-500 text-sm">
                  Resend code in {timeLeft}s
                </p>
              ) : (
                <button
                  onClick={resendOTP}
                  className="text-blue-500 hover:text-blue-400 text-sm font-medium transition-colors"
                >
                  Resend Code
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
