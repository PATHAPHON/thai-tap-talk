import { BatteryMedium, Flame, Gem, Languages } from "lucide-react";

interface ProgressHeaderProps {
  streak?: number;
  thaiLevel?: string;
  gems?: number;
  energy?: number;
}

const ProgressHeader = ({
  streak = 5,
  thaiLevel = "ระดับไทย A1",
  gems = 299,
  energy = 5,
}: ProgressHeaderProps) => {
  return (
    <div className="sticky top-0 z-40 px-4 py-3">
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-border/50 bg-transparent">
        <div className="flex items-center gap-1.5 px-1 py-1">
          <Flame className="w-5 h-5 text-nav-active" />
          <span className="text-foreground font-bold text-sm">{streak}</span>
        </div>

        <div className="flex items-center gap-1.5 px-1 py-1">
          <Languages className="w-4 h-4 text-primary" />
          <span className="text-foreground font-semibold text-xs sm:text-sm">{thaiLevel}</span>
        </div>

        <div className="flex items-center gap-3 px-1 py-1">
          <div className="flex items-center gap-1">
            <Gem className="w-4 h-4 text-primary" />
            <span className="text-foreground font-semibold text-xs">{gems}</span>
          </div>
          <div className="flex items-center gap-1">
            <BatteryMedium className="w-4 h-4 text-secondary" />
            <span className="text-foreground font-semibold text-xs">{energy}/5</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressHeader;
