import { Flame, Zap } from "lucide-react";

interface ProgressHeaderProps {
  streak?: number;
  xp?: number;
  gems?: number;
}

const ProgressHeader = ({ streak = 5, xp = 1240, gems = 299 }: ProgressHeaderProps) => {
  return (
    <div className="sticky top-0 z-40 bg-header px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Flame className="w-5 h-5 text-nav-active" />
          <span className="text-header-foreground font-bold text-sm">{streak}</span>
        </div>
        <h1 className="text-header-foreground font-bold text-base">Khurway</h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Zap className="w-4 h-4 text-nav-active" />
            <span className="text-header-foreground font-semibold text-xs">{xp} XP</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-primary text-xs">💎</span>
            <span className="text-header-foreground font-semibold text-xs">{gems}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressHeader;
