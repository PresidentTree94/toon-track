type Update = {
  month: string;
  value: number;
};

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
  data: Update[];
};