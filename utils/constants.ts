import { TreeDeciduous, Snail, HeartHandshake, LucideIcon } from "lucide-react";

export const ICONS: Record<string, LucideIcon> = {
  "Karly": TreeDeciduous,
  "Rachelle": Snail,
  "Shared": HeartHandshake
};

export const STATUS_COLORS: Record<string, string> = {
  "Ongoing": "text-green-500",
  "Hiatus": "text-orange-500",
  "Completed": "text-blue-500"
}

export const STATUS_BADGE_COLORS: Record<string, string> = {
  "Ongoing": "bg-green-500/15",
  "Hiatus": "bg-orange-500/15",
  "Completed": "bg-blue-500/15"
}