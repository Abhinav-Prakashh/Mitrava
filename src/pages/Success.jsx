import { useLocation, useNavigate } from "react-router-dom";

export default function Success() {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">

        {/* Heading */}
        <h1 className="text-2xl font-bold text-green-600 mb-4 text-center">
          ✅ Payment Successful
        </h1>

        {/* Receipt Box */}
        <div className="border rounded-lg p-4 text-sm space-y-2 bg-gray-50">

          <div className="flex justify-between">
            <span>Transaction ID</span>
            <span className="font-semibold">{state?.txnId}</span>
          </div>

          <div className="flex justify-between">
            <span>Plan</span>
            <span>{state?.plan}</span>
          </div>

          <div className="flex justify-between">
            <span>Amount</span>
            <span>₹{state?.amount}</span>
          </div>

          <div className="flex justify-between">
            <span>Payout</span>
            <span>₹{state?.payout}/day</span>
          </div>

          <div className="flex justify-between">
            <span>Date</span>
            <span>{state?.date}</span>
          </div>

          <div className="flex justify-between text-green-600 font-semibold">
            <span>Status</span>
            <span>Success</span>
          </div>

        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-6">

          <button
            onClick={() => window.print()}
            className="flex-1 bg-gray-200 py-2 rounded-lg font-semibold"
          >
            Download Receipt 🧾
          </button>

          <button
            onClick={() => navigate("/app/home")}
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold"
          >
            Dashboard
          </button>

        </div>

      </div>
    </div>
  );
}