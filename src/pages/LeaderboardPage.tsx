import { Trophy, Clock } from "lucide-react";
import ProgressHeader from "@/components/ProgressHeader";

interface Player {
  id: number;
  name: string;
  xp: number;
  level: number;
  isYou?: boolean;
}

const players: Player[] = [
  { id: 1, name: "Somchai", xp: 450, level: 28 },
  { id: 2, name: "Pathaphon", xp: 380, level: 24 },
  { id: 3, name: "Nattaya", xp: 320, level: 22 },
  { id: 4, name: "You", xp: 290, level: 24, isYou: true },
  { id: 5, name: "Arisa", xp: 250, level: 20 },
  { id: 6, name: "Tanakorn", xp: 210, level: 18 },
  { id: 7, name: "Ploy", xp: 180, level: 16 },
  { id: 8, name: "Krit", xp: 150, level: 14 },
];

const trophyColors = ["text-gold", "text-muted-foreground", "text-secondary"];

const LeaderboardPage = () => {
  return (
    <div className="min-h-screen pb-24">
      <ProgressHeader />

      <div className="px-4 pt-5">
        <h2 className="text-foreground font-bold text-xl">Team League</h2>
        <div className="flex items-center gap-1 text-muted-foreground text-xs mt-1">
          <Clock className="w-3.5 h-3.5" />
          <span>17 days</span>
        </div>

        {/* Top 3 Trophies */}
        <div className="flex items-end justify-center gap-6 mt-6 mb-6">
          {[1, 0, 2].map((idx) => (
            <div key={idx} className="flex flex-col items-center animate-pop-in">
              <Trophy
                className={`w-12 h-12 ${trophyColors[idx]} drop-shadow-md`}
                strokeWidth={1.5}
              />
              <span className="text-xs font-bold text-foreground mt-1">
                {players[idx]?.name}
              </span>
            </div>
          ))}
        </div>

        {/* Rankings List */}
        <div className="space-y-2">
          {players.map((player, i) => (
            <div
              key={player.id}
              className={`card-warm p-3 flex items-center gap-3 animate-slide-up ${
                player.isYou ? "ring-2 ring-primary" : ""
              }`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <span className="w-6 text-center font-bold text-sm text-muted-foreground">
                {i + 1}
              </span>
              <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
                <span className="text-sm font-bold text-muted-foreground">
                  {player.name[0]}
                </span>
              </div>
              <div className="flex-1">
                <p className={`text-sm font-bold ${player.isYou ? "text-primary" : "text-foreground"}`}>
                  {player.name}
                </p>
                <p className="text-xs text-muted-foreground">Lv. {player.level}</p>
              </div>
              <span className="text-sm font-bold text-foreground">{player.xp} XP</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
