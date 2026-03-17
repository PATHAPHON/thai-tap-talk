import { useLocation, useNavigate } from "react-router-dom";
import { Home, Target, Trophy, ShoppingCart, User } from "lucide-react";

const navItems = [
  { path: "/home", icon: Home, label: "Learn" },
  { path: "/quests", icon: Target, label: "Quests" },
  { path: "/leaderboard", icon: Trophy, label: "Rank" },
  { path: "/shop", icon: ShoppingCart, label: "Shop" },
  { path: "/profile", icon: User, label: "Profile" },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Hide nav during lessons
  if (location.pathname.startsWith("/lesson")) return null;

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-nav border-t-2 border-nav-active/30 z-50">
      <div className="flex items-center justify-around py-2 pb-[env(safe-area-inset-bottom,8px)]">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="flex flex-col items-center gap-0.5 px-3 py-1 transition-all duration-200"
            >
              <Icon
                className={`w-6 h-6 transition-all duration-200 ${
                  isActive ? "text-nav-active scale-110" : "text-nav-foreground"
                }`}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span
                className={`text-[10px] font-semibold transition-colors ${
                  isActive ? "text-nav-active" : "text-nav-foreground"
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
