import { Flame, Zap, Trophy, Award } from "lucide-react";
import ProgressHeader from "@/components/ProgressHeader";

const stats = [
  { icon: "🇹🇭", label: "Level", value: "24" },
  { icon: Flame, label: "Streak", value: "234" },
  { icon: Trophy, label: "League", value: "1" },
  { icon: Zap, label: "Total XP", value: "24,445" },
];

const badges = Array(4).fill(null);
const achievements = Array(4).fill(null);

const ProfilePage = () => {
  return (
    <div className="min-h-screen pb-24">
      <ProgressHeader />

      <div className="px-4 pt-5">
        <h2 className="text-foreground font-bold text-xl">Profile</h2>
        <p className="text-muted-foreground text-xs mt-0.5">@student123 · Joined 2023</p>

        {/* Avatar */}
        <div className="flex justify-center my-6">
          <div className="w-24 h-24 rounded-full bg-secondary/30 flex items-center justify-center animate-pop-in">
            <span className="text-4xl">🧑‍🎓</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="card-warm p-3 flex items-center gap-2 animate-slide-up"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {typeof stat.icon === "string" ? (
                <span className="text-lg">{stat.icon}</span>
              ) : (
                <stat.icon className="w-5 h-5 text-secondary" />
              )}
              <div>
                <p className="font-bold text-foreground text-sm">{stat.value}</p>
                <p className="text-[10px] text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Monthly Badges */}
        <h3 className="text-sm font-bold text-muted-foreground mb-3">Monthly Badges</h3>
        <div className="grid grid-cols-4 gap-3 mb-6">
          {badges.map((_, i) => (
            <div
              key={i}
              className="w-full aspect-square rounded-full bg-muted flex items-center justify-center"
            >
              <Award className="w-6 h-6 text-muted-foreground/40" />
            </div>
          ))}
        </div>

        {/* Achievements */}
        <h3 className="text-sm font-bold text-muted-foreground mb-3">Achievements</h3>
        <div className="grid grid-cols-4 gap-3">
          {achievements.map((_, i) => (
            <div
              key={i}
              className="w-full aspect-square rounded-xl bg-muted flex items-center justify-center"
            >
              <Trophy className="w-6 h-6 text-muted-foreground/40" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
