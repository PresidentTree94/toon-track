export type Toon = {
  id: number;
  title: string;
  authors: string;
  genre: string;
  status: ("Ongoing" | "Hiatus" | "Completed");
  owner: ("Karly" | "Rachelle" | "Shared");
  protagonists: string;
  days: string;
  toon: string;
  thumbnail: string;
  data: { month: string; value: number; }[];
  timestamp: string;
  owner_time: string;
  status_time: string;
  initial: boolean;
  tags: string[];
  manual_updates: boolean;
};