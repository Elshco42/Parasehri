import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const saatlikVeri = [
  { zaman: "01:00", gelir: 2.5 },
  { zaman: "02:00", gelir: 2.9 },
  { zaman: "03:00", gelir: 3.1 },
  { zaman: "04:00", gelir: 3.5 },
  { zaman: "05:00", gelir: 4.0 },
  { zaman: "06:00", gelir: 4.4 },
];

const haftalikVeri = [
  { zaman: "Pzt", gelir: 40 },
  { zaman: "Salı", gelir: 55 },
  { zaman: "Çrş", gelir: 61 },
  { zaman: "Perş", gelir: 70 },
  { zaman: "Cuma", gelir: 80 },
  { zaman: "Cmt", gelir: 90 },
  { zaman: "Paz", gelir: 120 },
];

const aylikVeri = [
  { zaman: "1. Hafta", gelir: 300 },
  { zaman: "2. Hafta", gelir: 450 },
  { zaman: "3. Hafta", gelir: 560 },
  { zaman: "4. Hafta", gelir: 700 },
];

const GrafikBolumu = ({ title, data }) => (
  <div style={{ marginTop: 30 }}>
    <h3>{title}</h3>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="zaman" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="gelir" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const Gelir = () => {
  return (
    <div style={{ padding: 30 }}>
      <h2 style={{ fontSize: "28px", fontWeight: "bold" }}>💰 Gelir Takibi</h2>

      <div
        style={{
          marginTop: 30,
          padding: 20,
          border: "1px solid #ccc",
          borderRadius: 10,
          backgroundColor: "#f9f9f9",
        }}
      >
        <h2>📈 En Çok Kazandıran İnek</h2>
        <p><strong>İnek4svy</strong> - 350₺</p>
        <p>%255 kazanç sağlar - Aylık 420₺ kazandırır</p>
      </div>

      <GrafikBolumu title="⏰ Saatlik Gelir" data={saatlikVeri} />
      <GrafikBolumu title="📅 Haftalık Gelir" data={haftalikVeri} />
      <GrafikBolumu title="🗓️ Aylık Gelir" data={aylikVeri} />
    </div>
  );
};

export default Gelir;