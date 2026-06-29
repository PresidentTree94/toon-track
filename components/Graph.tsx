"use client";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { condenseValue } from "@/utils/calculations";

export default function Graph({ data }:Readonly<{ data: Object[]; }>) {
  return (
    <ResponsiveContainer>
      <AreaChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" fontSize={14} />
        <YAxis fontSize={14} width={70} tickFormatter={condenseValue} />
        <Tooltip formatter={(v) => condenseValue(Number(v))} />
        <Area type="monotone" dataKey="value" stroke="hsl(150, 100%, 40%)" fill="hsl(150, 100%, 40%)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}