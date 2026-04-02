import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePayment = () => {
    setShowPopup(true);
  };

  const handleFakePay = () => {
    setLoading(true);

    const paymentData = {
      plan: state?.name,
      amount: state?.weeklyPrice,
      payout: state?.maxDailyPayout,
      txnId: "TXN" + Math.floor(Math.random() * 1000000),
      date: new Date().toLocaleString(),
    };

    setTimeout(() => {
      // ✅ SAVE PAYMENT HISTORY
      const existing =
        JSON.parse(localStorage.getItem("paymentHistory")) || [];
      existing.push(paymentData);
      localStorage.setItem("paymentHistory", JSON.stringify(existing));

      // ✅ SAVE LATEST PLAN (for dashboard)
      localStorage.setItem("userPlan", JSON.stringify(paymentData));

      setShowPopup(false);
      navigate("/success", { state: paymentData });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 px-4">

      {/* Main Card */}
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">

        <h1 className="text-2xl font-extrabold mb-6 text-center">
          Payment Summary
        </h1>

        <div className="space-y-3 mb-6 text-sm">
          <div className="flex justify-between">
            <span>Plan</span>
            <span className="font-semibold">{state?.name}</span>
          </div>

          <div className="flex justify-between">
            <span>Price</span>
            <span className="font-semibold">₹{state?.weeklyPrice}/week</span>
          </div>

          <div className="flex justify-between">
            <span>Payout</span>
            <span className="font-semibold">₹{state?.maxDailyPayout}/day</span>
          </div>
        </div>

        <button
          onClick={handlePayment}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 active:scale-95 transition"
        >
          Pay Now 💳
        </button>

        <p className="text-xs text-gray-400 text-center mt-4">
          🔒 Secure payment powered by Mitrava
        </p>
      </div>

      {/* 🔥 FAKE RAZORPAY POPUP */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white rounded-xl w-[360px] shadow-2xl p-6 relative animate-fadeIn">

            {/* Header */}
            <h2 className="text-lg font-bold mb-4 text-center">
              Razorpay Secure Payment
            </h2>

            {/* Amount */}
            <div className="text-center mb-4">
              <p className="text-gray-500 text-sm">Paying</p>
              <p className="text-2xl font-bold text-blue-600">
                ₹{state?.weeklyPrice}
              </p>
            </div>

            {/* Fake Inputs */}
            <div className="space-y-3 mb-4">
              <input
                type="text"
                placeholder="Card Number"
                className="w-full border p-2 rounded focus:outline-blue-500"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-1/2 border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  className="w-1/2 border p-2 rounded"
                />
              </div>
            </div>

            {/* Pay Button */}
            <button
              onClick={handleFakePay}
              disabled={loading}
              className={`w-full py-2 rounded text-white font-bold transition
                ${loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 active:scale-95"
                }`}
            >
              {loading ? "Processing..." : `Pay ₹${state?.weeklyPrice}`}
            </button>

            {/* Close */}
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-3 text-gray-400 text-lg hover:text-black"
            >
              ✕
            </button>

          </div>
        </div>
      )}

    </div>
  );
}