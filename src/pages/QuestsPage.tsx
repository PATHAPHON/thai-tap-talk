import { Clock, Gift } from "lucide-react";
import ProgressHeader from "@/components/ProgressHeader";

interface Quest {
  id: number;
  title: string;
  progress: number;
  target: number;
  reward: number;
}

const monthlyQuest = { title: "March Missions", daysLeft: 17, progress: 18, target: 25 };

const dailyQuests: Quest[] = [
  { id: 1, title: "Earn 20 XP", progress: 15, target: 20, reward: 5 },
  { id: 2, title: "Complete 1 lesson with 90%", progress: 0, target: 1, reward: 10 },
  { id: 3, title: "Study for 10 minutes", progress: 7, target: 10, reward: 5 },
];

const QuestsPage = () => {
  return (
    <div className="min-h-screen pb-24">
      <ProgressHeader />

      <div className="px-4 pt-5">
        <h2 className="text-foreground font-bold text-xl">Quests</h2>

        {/* Monthly Quest */}
        <div className="card-warm p-4 mt-4 animate-pop-in">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-foreground">{monthlyQuest.title}</h3>
            <div className="flex items-center gap-1 text-muted-foreground text-xs">
              <Clock className="w-3.5 h-3.5" />
              <span>{monthlyQuest.daysLeft} days</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mb-2">
            Collect {monthlyQuest.target} quest points
          </p>
          <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
            <div
              className="progress-bar-fill"
              style={{ width: `${(monthlyQuest.progress / monthlyQuest.target) * 100}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1 text-right">
            {monthlyQuest.progress}/{monthlyQuest.target}
          </p>
        </div>

        {/* Daily Quests */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-foreground">Daily Quests</h3>
            <div className="flex items-center gap-1 text-muted-foreground text-xs">
              <Clock className="w-3.5 h-3.5" />
              <span>1 hour</span>
            </div>
          </div>

          <div className="space-y-3">
            {dailyQuests.map((quest, i) => (
              <div
                key={quest.id}
                className="card-warm p-4 flex items-center gap-3 animate-slide-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">{quest.title}</p>
                  <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden mt-2">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${(quest.progress / quest.target) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <Gift className="w-8 h-8 text-primary" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestsPage;
