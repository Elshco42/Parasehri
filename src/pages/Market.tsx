import React from "react";
import { useOyun } from "../context/OyunContext";
import { useNavigate } from "react-router-dom";

const inekler = [
  {
    id: "inek1svy",
    ad: "Beyaz İnek (Seviye 1)",
    fiyat: 100,
    haftalik: 30,
    resim: "/inek1svy.png",
  },
  {
    id: "inek2svy",
    ad: "Benekli İnek (Seviye 2)",
    fiyat: 150,
    haftalik: 42,
    resim: "/inek2svy.png",
  },
  {
    id: "inek3svy",
    ad: "Kara İnek (Seviye 3)",
    fiyat: 250,
    haftalik: 75,
    resim: "/inek3svy.png",
  },
  {
    id: "inek4svy",
    ad: "Lüks İnek (Seviye 4)",
    fiyat: 350,
    haftalik: 105,
    resim: "/inek4svy.png",
  },
];

const Market = () => {
  const { bakiye, setBakiye, envanter, setEnvanter } = useOyun();
  const navigate = useNavigate();

  const satinAl = (inek) => {
    if (bakiye >= inek.fiyat) {
      setBakiye(bakiye - inek.fiyat);
      setEnvanter([...envanter, inek]);
      alert(`${inek.ad} başarıyla ${inek.fiyat}₺ karşılığında alındı!`);
    } else {
      alert("Yetersiz bakiye!");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          padding: "10px 20px",
          background: "#9c27b0",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        ⬅ Geri Git
      </button>

      <h1>🐄 Market</h1>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {inekler.map((inek) => {
          const gunluk = (inek.haftalik / 7).toFixed(2);
          const aylik = (inek.haftalik * 4.285).toFixed(2);

          return (
            <div
              key={inek.id}
              style={{
                width: "200px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "10px",
                textAlign: "center",
                background: "#fefefe",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src={inek.resim}
                alt={inek.ad}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "contain",
                }}
              />
              <h3>{inek.ad}</h3>
              <p>🗓 Haftalık: {inek.haftalik}₺</p>
              <p>📅 Günlük: {gunluk}₺</p>
              <p>📆 Aylık: {aylik}₺</p>
              <button
                onClick={() => satinAl(inek)}
                style={{
                  marginTop: "10px",
                  padding: "8px 12px",
                  background: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                {inek.fiyat}₺ Satın Al
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Market;