import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SplashScreen = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<"brown" | "logo" | "fade">("brown");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("logo"), 800);
    const t2 = setTimeout(() => setPhase("fade"), 2200);
    const t3 = setTimeout(() => navigate("/home", { replace: true }), 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [navigate]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center transition-all duration-700 ease-in-out z-50"
      style={{
        backgroundColor: phase === "brown" ? "hsl(24, 20%, 35%)" : "hsl(42, 38%, 85%)",
        opacity: phase === "fade" ? 0 : 1,
      }}
    >
      <h1
        className="text-4xl font-bold font-display tracking-wider transition-all duration-500"
        style={{
          color: "hsl(168, 25%, 52%)",
          opacity: phase === "brown" ? 0 : 1,
          transform: phase === "brown" ? "scale(0.8)" : "scale(1)",
        }}
      >
        Khurway
      </h1>
    </div>
  );
};

export default SplashScreen;
