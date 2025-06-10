import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [kullaniciVerisi, setKullaniciVerisi] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const kullanici = auth.currentUser;

    if (!kullanici) {
      navigate("/login");
      return;
    }

    const veriyiGetir = async () => {
      const ref = doc(db, "kullanicilar", kullanici.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setKullaniciVerisi(snap.data());
      }
    };

    veriyiGetir();
  }, []);

  if (!kullaniciVerisi) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>🏠 Ana Sayfa</h2>
      <p><strong>Bakiyen:</strong> {kullaniciVerisi.bakiye} ₺</p>
      <h3>🐄 Hayvanların:</h3>
      <ul>
        {kullaniciVerisi.hayvanlar.map((h, index) => (
          <li key={index}>
            {h.adet}x {h.isim} – Saatlik: {h.kazanc} ₺
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;