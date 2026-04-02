import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);

  const navigate = useNavigate();

  // ✅ FIXED AUTO REDIRECT LOGIC
  useEffect(() => {
    const userData = localStorage.getItem("user");
    const user = userData ? JSON.parse(userData) : null;

    // 🔥 Only redirect if fully onboarded
    if (user && user.onboarded) {
      navigate("/app/home");
    }
  }, [navigate]);

  // ⏳ OTP TIMER
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // 📱 SEND OTP
  const handleSendOtp = () => {
    if (!/^[6-9]\d{9}$/.test(phone)) {
      alert("Enter valid Indian phone number");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setStep(2);
      setTimer(30);
      alert("OTP sent successfully (use 1234)");
    }, 1000);
  };

  // 🔐 VERIFY OTP
  const handleVerifyOtp = () => {
    if (otp === "1234") {
      localStorage.setItem(
        "user",
        JSON.stringify({
          phone,
          onboarded: false, // 🔥 IMPORTANT
        })
      );

      navigate("/landing"); // ✅ correct flow
    } else {
      alert("Invalid OTP");
    }
  };

  // 🔁 RESEND OTP
  const handleResend = () => {
    if (timer === 0) {
      setTimer(30);
      alert("OTP resent (use 1234)");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">

      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">

        <h1 className="text-2xl font-bold mb-2 text-center">
          Welcome Back 👋
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Login with your phone number
        </p>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <div className="flex items-center border rounded mb-4">
              <span className="px-3 text-gray-500">+91</span>
              <input
                type="text"
                maxLength={10}
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value.replace(/\D/g, ""))
                }
                className="w-full p-2 outline-none"
              />
            </div>

            <button
              onClick={handleSendOtp}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <input
              type="text"
              maxLength={4}
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, ""))
              }
              className="w-full border p-2 rounded mb-4 text-center tracking-widest"
            />

            <button
              onClick={handleVerifyOtp}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded mb-3"
            >
              Verify OTP
            </button>

            <div className="text-center text-sm text-gray-500">
              {timer > 0 ? (
                <p>Resend OTP in {timer}s</p>
              ) : (
                <button
                  onClick={handleResend}
                  className="text-blue-600 font-medium"
                >
                  Resend OTP
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}