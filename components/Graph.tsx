"use client";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function Graph({
  data, xValues, yValues, height = 300
}:Readonly<{ 
  data: Object[];
  xValues: string;
  yValues: string;
  height?: number | `${number}%`;
}>) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xValues} fontSize={14} />
        <YAxis width="auto" fontSize={14} />
        <Tooltip />
        <Area type="monotone" dataKey={yValues} stroke="hsl(150, 100%, 40%)" fill="hsl(150, 100%, 40%)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}