import { useState } from "react";
import { Trophy, Clock, Swords, Zap, Bomb, ShieldCheck } from "lucide-react";
import ProgressHeader from "@/components/ProgressHeader";
import { useToast } from "@/hooks/use-toast";

interface Player {
  id: number;
  name: string;
  xp: number;
  level: number;
  isYou?: boolean;
  shielded?: boolean;
}

interface AttackPower {
  id: string;
  name: string;
  icon: typeof Zap;
  damage: number;
  count: number;
}

const initialPlayers: Player[] = [
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
  const { toast } = useToast();
  const [players, setPlayers] = useState(initialPlayers);
  const [attacks, setAttacks] = useState<AttackPower[]>([
    { id: "lightning", name: "Lightning", icon: Zap, damage: 10, count: 2 },
    { id: "sword", name: "Sword", icon: Swords, damage: 25, count: 1 },
    { id: "bomb", name: "Bomb", icon: Bomb, damage: 50, count: 0 },
  ]);
  const [selectedAttack, setSelectedAttack] = useState<string | null>(null);
  const [attackAnimation, setAttackAnimation] = useState<number | null>(null);

  const handleAttackPlayer = (playerId: number) => {
    if (!selectedAttack) {
      toast({ title: "Select a power-up first!", description: "Choose an attack from the bar below." });
      return;
    }

    const attack = attacks.find((a) => a.id === selectedAttack);
    if (!attack || attack.count <= 0) {
      toast({ title: "No charges left!", description: "Buy more from the Shop." });
      return;
    }

    const target = players.find((p) => p.id === playerId);
    if (!target || target.isYou) return;

    // Trigger animation
    setAttackAnimation(playerId);

    setTimeout(() => {
      setPlayers((prev) =>
        prev
          .map((p) =>
            p.id === playerId ? { ...p, xp: Math.max(0, p.xp - attack.damage) } : p
          )
          .sort((a, b) => b.xp - a.xp)
      );

      setAttacks((prev) =>
        prev.map((a) => (a.id === selectedAttack ? { ...a, count: a.count - 1 } : a))
      );

      setAttackAnimation(null);
      setSelectedAttack(null);

      toast({
        title: `⚔️ ${attack.name} Strike!`,
        description: `${target.name} lost ${attack.damage} XP!`,
      });
    }, 600);
  };

  const sortedPlayers = [...players].sort((a, b) => b.xp - a.xp);

  return (
    <div className="min-h-screen pb-36">
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
                {sortedPlayers[idx]?.name}
              </span>
            </div>
          ))}
        </div>

        {/* Attack Mode Hint */}
        {selectedAttack && (
          <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-3 mb-4 animate-pop-in">
            <p className="text-xs font-bold text-destructive text-center">
              ⚔️ Attack mode! Tap a rival to attack them.
            </p>
          </div>
        )}

        {/* Rankings List */}
        <div className="space-y-2">
          {sortedPlayers.map((player, i) => (
            <div
              key={player.id}
              className={`card-warm p-3 flex items-center gap-3 animate-slide-up transition-all duration-300 ${
                player.isYou ? "ring-2 ring-primary" : ""
              } ${attackAnimation === player.id ? "scale-95 opacity-50 bg-destructive/10" : ""} ${
                selectedAttack && !player.isYou ? "cursor-pointer active:scale-95" : ""
              }`}
              style={{ animationDelay: `${i * 0.05}s` }}
              onClick={() => !player.isYou && handleAttackPlayer(player.id)}
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
              {!player.isYou && selectedAttack && (
                <Swords className="w-5 h-5 text-destructive animate-bounce-soft" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Attack Power-Up Bar */}
      <div className="fixed bottom-[68px] left-1/2 z-40 w-full max-w-[48rem] -translate-x-1/2 bg-card border-t border-border px-4 py-3">
        <p className="text-[10px] font-bold text-muted-foreground mb-2 uppercase tracking-wider">
          Your Power-Ups
        </p>
        <div className="flex gap-2">
          {attacks.map((attack) => {
            const Icon = attack.icon;
            const isSelected = selectedAttack === attack.id;
            const isEmpty = attack.count <= 0;
            return (
              <button
                key={attack.id}
                onClick={() =>
                  isEmpty
                    ? toast({ title: "No charges!", description: "Buy more from the Shop." })
                    : setSelectedAttack(isSelected ? null : attack.id)
                }
                className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-xl border-2 transition-all active:scale-95 ${
                  isSelected
                    ? "border-destructive bg-destructive/10 scale-105"
                    : isEmpty
                    ? "border-border bg-muted opacity-50"
                    : "border-border bg-card"
                }`}
              >
                <Icon className={`w-5 h-5 ${isSelected ? "text-destructive" : isEmpty ? "text-muted-foreground" : "text-foreground"}`} />
                <span className={`text-[10px] font-bold ${isSelected ? "text-destructive" : "text-foreground"}`}>
                  {attack.name}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  -{attack.damage} XP · ×{attack.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
