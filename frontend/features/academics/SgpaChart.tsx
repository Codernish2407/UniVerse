"use client";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function SgpaChart({ data }: { data: { label: string; sgpa: number }[] }) {
  return (
    <div className="h-56 w-full" role="img" aria-label={`SGPA by semester: ${data.map((d) => `${d.label} ${d.sgpa.toFixed(2)}`).join(", ")}`}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid stroke="#293149" vertical={false} />
          <XAxis dataKey="label" stroke="#8089a3" fontSize={12} tickLine={false} />
          <YAxis domain={[0, 10]} stroke="#8089a3" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip cursor={{ fill: "#202841" }} contentStyle={{ background: "#12192e", border: "1px solid #293149", borderRadius: 12, color: "#f5f4fa" }} formatter={(v) => [Number(v).toFixed(2), "SGPA"]} />
          <Bar dataKey="sgpa" fill="#6c63ff" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
