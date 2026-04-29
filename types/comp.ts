export type Comp = {
  id: number;
  title: string;
  authors: string;
  genre: string;
  owner: ("Karly" | "Rachelle" | "Shared");
  protagonists: string;
  toon: string;
  thumbnail: string;
  timestamp: string;
  reminder: ("" | "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday");
  tags: string[];
}