import { useState } from "react";
import { Flame, Shield, Gem, Swords, Zap, Bomb } from "lucide-react";
import ProgressHeader from "@/components/ProgressHeader";
import { useToast } from "@/hooks/use-toast";

interface ShopItem {
  id: number;
  name: string;
  description: string;
  price: number;
  icon: "flame" | "shield" | "gem" | "swords" | "zap" | "bomb";
  category: "streak" | "attack";
  damage?: number;
}

const streakItems: ShopItem[] = [
  {
    id: 1,
    name: "Streak Freeze",
    description: "Protect your streak if you miss a day. Up to 2 uses.",
    price: 299,
    icon: "flame",
    category: "streak",
  },
  {
    id: 2,
    name: "Streak Shield",
    description: "Protect your streak if you miss a day. Single use.",
    price: 199,
    icon: "shield",
    category: "streak",
  },
];

const attackItems: ShopItem[] = [
  {
    id: 10,
    name: "Lightning Strike",
    description: "Zap a rival! Reduces their XP by 10. Quick and precise.",
    price: 150,
    icon: "zap",
    category: "attack",
    damage: 10,
  },
  {
    id: 11,
    name: "Sword Slash",
    description: "A powerful slash! Reduces a rival's XP by 25.",
    price: 300,
    icon: "swords",
    category: "attack",
    damage: 25,
  },
  {
    id: 12,
    name: "XP Bomb",
    description: "Devastating attack! Reduces a rival's XP by 50. Use wisely!",
    price: 500,
    icon: "bomb",
    category: "attack",
    damage: 50,
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
  swords: Swords,
  zap: Zap,
  bomb: Bomb,
};

const ShopItemCard = ({ item, onBuy }: { item: ShopItem; onBuy: (item: ShopItem) => void }) => {
  const Icon = iconMap[item.icon];
  const isAttack = item.category === "attack";
  return (
    <div className={`card-warm p-4 flex gap-3 animate-slide-up ${isAttack ? "border-destructive/30" : ""}`}>
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${isAttack ? "bg-destructive/10" : "bg-secondary/20"}`}>
        <Icon className={`w-8 h-8 ${isAttack ? "text-destructive" : "text-secondary"}`} />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h4 className="font-bold text-sm text-foreground">{item.name}</h4>
          {item.damage && (
            <span className="text-[10px] font-bold bg-destructive/15 text-destructive px-1.5 py-0.5 rounded-full">
              -{item.damage} XP
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
        <button
          onClick={() => onBuy(item)}
          className={`mt-2 flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold active:scale-95 transition-transform ${
            isAttack
              ? "bg-destructive text-destructive-foreground"
              : "bg-secondary text-secondary-foreground"
          }`}
        >
          <span>💎</span>
          <span>{item.price}</span>
        </button>
      </div>
    </div>
  );
};

const ShopPage = () => {
  const { toast } = useToast();

  const handleBuy = (item: ShopItem) => {
    toast({
      title: `Purchased ${item.name}!`,
      description: item.category === "attack"
        ? `Go to Leaderboard to use it on a rival!`
        : `Added to your inventory.`,
    });
  };

  return (
    <div className="min-h-screen pb-24">
      <ProgressHeader />

      <div className="px-4 pt-5">
        <h2 className="text-foreground font-bold text-xl">Shop</h2>

        {/* Attack Power-Ups */}
        <h3 className="text-sm font-bold text-destructive mt-5 mb-3 flex items-center gap-1.5">
          <Swords className="w-4 h-4" /> Attack Power-Ups
        </h3>
        <div className="space-y-3">
          {attackItems.map((item) => (
            <ShopItemCard key={item.id} item={item} onBuy={handleBuy} />
          ))}
        </div>

        {/* Streak Items */}
        <h3 className="text-sm font-bold text-muted-foreground mt-6 mb-3 flex items-center gap-1.5">
          <Shield className="w-4 h-4" /> Streak Protection
        </h3>
        <div className="space-y-3">
          {streakItems.map((item) => (
            <ShopItemCard key={item.id} item={item} onBuy={handleBuy} />
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
