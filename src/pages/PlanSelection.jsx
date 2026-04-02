import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { plans } from "../data/mockData";

export default function PlanSelection() {
  const navigate = useNavigate();

  const [selected, setSelected] = useState("standard");
  const [billing, setBilling] = useState("weekly");

  const handleContinue = () => {
    const selectedPlan = plans.find((p) => p.id === selected);
    navigate("/app/payment", { state: selectedPlan });
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-xl shadow-soft">
        <div className="flex items-center justify-between px-6 lg:px-10 py-4 max-w-7xl mx-auto">
          <div className="text-2xl font-extrabold tracking-tighter text-primary">
            Mitrava
          </div>

          <button
            onClick={() => navigate("/onboarding")}
            className="flex items-center gap-2 text-sm font-semibold text-on-surface-variant hover:text-on-surface transition-colors"
          >
            EXIT APPLICATION
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 lg:px-10 py-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">
              Insurance for Innovators
            </p>

            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tighter text-on-surface">
              Protection for the
              <br />
              <span className="text-primary">Urban Delivery Partner.</span>
            </h1>
          </div>

          <div className="inline-flex border border-surface-container-highest rounded-lg overflow-hidden">
            {["weekly", "monthly"].map((b) => (
              <button
                key={b}
                onClick={() => setBilling(b)}
                className={`px-6 py-2.5 text-sm font-bold capitalize transition-colors
                  ${
                    billing === b
                      ? "bg-on-surface text-surface"
                      : "text-on-surface-variant hover:bg-surface-container-high"
                  }`}
              >
                {b.charAt(0).toUpperCase() + b.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => setSelected(plan.id)}
              className={`relative rounded-xl p-8 cursor-pointer transition-all
                ${
                  selected === plan.id
                    ? "bg-surface-container-lowest shadow-[0_0_0_2px_#0056D2]"
                    : "bg-surface-container-low hover:bg-surface-container-high"
                }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-on-primary text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full">
                  Recommended
                </div>
              )}

              <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-3">
                {plan.name}
              </p>

              <div className="text-4xl font-extrabold tracking-tighter text-on-surface mb-1">
                ₹
                {billing === "weekly" ? plan.weeklyPrice : plan.weeklyPrice * 4}
                <span className="text-base font-semibold text-on-surface-variant">
                  /{billing === "weekly" ? "wk" : "mo"}
                </span>
              </div>

              <p className="text-sm text-on-surface-variant mb-6">
                Max payout:{" "}
                <strong className="text-on-surface">
                  ₹{plan.maxDailyPayout}/day
                </strong>
              </p>

              <ul className="flex flex-col gap-3 mb-8">
                {(plan.features || []).map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-3 text-sm text-on-surface-variant"
                  >
                    <span
                      className="material-symbols-outlined text-primary text-base"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/app/payment", { state: plan });
                }}
                className={`w-full py-3.5 rounded-lg font-bold text-sm transition-all
                  ${
                    plan.popular
                      ? "bg-primary text-on-primary shadow-blue"
                      : "bg-surface-container-highest text-on-surface hover:bg-surface-container"
                  }`}
              >
                {plan.popular ? "Secure Coverage" : `Select ${plan.name}`}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={handleContinue}
            className="bg-primary text-on-primary font-bold px-10 py-4 rounded-lg shadow-blue transition-transform active:scale-95 inline-flex items-center gap-2"
          >
            Continue
            <span className="material-symbols-outlined text-base">
              arrow_forward
            </span>
          </button>
        </div>
      </main>
    </div>
  );
}
