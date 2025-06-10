import React from "react";
import { useOyun } from "../context/OyunContext";

const Envanter = () => {
  const { envanter } = useOyun();

  if (envanter.length === 0) {
    return <h2 style={{ padding: "20px" }}>Hiç inek satın alınmamış.</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>🎒 Envanterim</h1>
      <div
        style={{
          display: "flex",
          gap: "16px",
          overflowX: "auto",
          padding: "10px 0",
        }}
      >
        {envanter.map((inek, index) => {
          // Eğer sadece ID tutuluyorsa, burada inek bilgisi çekilmeli.
          // Biz tam nesne sakladığımızı varsayıyoruz.
          const gunluk = (inek.haftalik / 7).toFixed(2);
          const aylik = (inek.haftalik * 4.285).toFixed(2);

          return (
            <div
              key={index}
              style={{
                minWidth: "220px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "10px",
                background: "#fefefe",
                textAlign: "center",
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Envanter;