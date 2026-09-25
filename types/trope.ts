export type Trope = {
  _id: string;
  title: string;
  description: any;
  references: { label: string; link: string; }[];
  related: { _id: string; title: string; }[];
}