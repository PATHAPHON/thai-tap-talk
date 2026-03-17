import { Flame, Shield, Gem } from "lucide-react";
import ProgressHeader from "@/components/ProgressHeader";

interface ShopItem {
  id: number;
  name: string;
  description: string;
  price: number;
  currency: "gems" | "money";
  moneyPrice?: string;
  icon: "flame" | "shield" | "gem";
}

const streakItems: ShopItem[] = [
  {
    id: 1,
    name: "Streak Freeze",
    description: "Protect your streak if you miss a day. Up to 2 uses.",
    price: 299,
    currency: "gems",
    icon: "flame",
  },
];

const powerUps: ShopItem[] = [
  {
    id: 2,
    name: "Streak Shield",
    description: "Protect your streak if you miss a day. Single use.",
    price: 199,
    currency: "gems",
    icon: "shield",
  },
];

const gemPacks = [
  { id: 3, amount: 1200, price: "฿199.00" },
  { id: 4, amount: 2200, price: "฿299.00" },
  { id: 5, amount: 3200, price: "฿399.00" },
  { id: 6, amount: 4200, price: "฿499.00" },
];

const iconMap = {
  flame: Flame,
  shield: Shield,
  gem: Gem,
};

const ShopItemCard = ({ item }: { item: ShopItem }) => {
  const Icon = iconMap[item.icon];
  return (
    <div className="card-warm p-4 flex gap-3 animate-slide-up">
      <div className="w-14 h-14 rounded-xl bg-secondary/20 flex items-center justify-center shrink-0">
        <Icon className="w-8 h-8 text-secondary" />
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-sm text-foreground">{item.name}</h4>
        <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
        <div className="flex items-center gap-1 mt-2">
          <span className="text-primary text-xs">💎</span>
          <span className="font-bold text-sm text-secondary">{item.price}</span>
        </div>
      </div>
    </div>
  );
};

const ShopPage = () => {
  return (
    <div className="min-h-screen pb-24">
      <ProgressHeader />

      <div className="px-4 pt-5">
        <h2 className="text-foreground font-bold text-xl">Shop</h2>

        {/* Streak Items */}
        <h3 className="text-sm font-bold text-muted-foreground mt-5 mb-3">Streak Protection</h3>
        <div className="space-y-3">
          {streakItems.map((item) => (
            <ShopItemCard key={item.id} item={item} />
          ))}
        </div>

        {/* Power Ups */}
        <h3 className="text-sm font-bold text-muted-foreground mt-6 mb-3">Power-Ups</h3>
        <div className="space-y-3">
          {powerUps.map((item) => (
            <ShopItemCard key={item.id} item={item} />
          ))}
        </div>

        {/* Gem Packs */}
        <h3 className="text-sm font-bold text-muted-foreground mt-6 mb-3">Gems</h3>
        <div className="grid grid-cols-4 gap-2">
          {gemPacks.map((pack, i) => (
            <button
              key={pack.id}
              className="card-warm p-3 flex flex-col items-center gap-1.5 active:scale-95 transition-transform animate-pop-in"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <Gem className="w-7 h-7 text-primary" />
              <span className="font-bold text-sm text-foreground">{pack.amount}</span>
              <span className="text-[10px] text-muted-foreground">{pack.price}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
