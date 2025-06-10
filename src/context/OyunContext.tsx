import React, { createContext, useContext, useEffect, useState } from "react";

const OyunContext = createContext();

export const OyunProvider = ({ children }) => {
  const [bakiye, setBakiye] = useState(0);
  const [oyunBakiyesi, setOyunBakiyesi] = useState(0);
  const [cekilebilirBakiye, setCekilebilirBakiye] = useState(0);
  const [envanter, setEnvanter] = useState([]);
  const [bildirim, setBildirim] = useState("");
  const [kullaniciAdi, setKullaniciAdi] = useState("");
  const [ilkYukleme, setIlkYukleme] = useState(true);

  const tumInekler = {
    inek1svy: { id: "inek1svy", haftalik: 30 },
    inek2svy: { id: "inek2svy", haftalik: 42 },
    inek3svy: { id: "inek3svy", haftalik: 75 },
    inek4svy: { id: "inek4svy", haftalik: 105 },
  };

  useEffect(() => {
    if (!ilkYukleme) return;

    const kayitliOyun = localStorage.getItem("oyunBakiyesi");
    setOyunBakiyesi(kayitliOyun !== null ? parseFloat(kayitliOyun) : 0);

    const kayitliCek = localStorage.getItem("cekilebilirBakiye");
    setCekilebilirBakiye(kayitliCek !== null ? parseFloat(kayitliCek) : 0);

    const kayitliEnvanter = localStorage.getItem("envanter");
    if (kayitliEnvanter) {
      const ids = JSON.parse(kayitliEnvanter);
      const nesneler = ids.map((id) => tumInekler[id]).filter(Boolean);
      setEnvanter(nesneler);
    } else {
      setEnvanter([]);
    }

    const kayitliKullaniciAdi = localStorage.getItem("kullaniciAdi");
    setKullaniciAdi(kayitliKullaniciAdi || "");

    // Offline kazancı hesapla
    const sonZaman = localStorage.getItem("sonZaman");
    if (sonZaman && kayitliEnvanter) {
      const simdi = Date.now();
      const gecenSaniye = Math.floor((simdi - Number(sonZaman)) / 1000);
      let kazanc = 0;
      const ids = JSON.parse(kayitliEnvanter);
      const nesneler = ids.map((id) => tumInekler[id]).filter(Boolean);

      nesneler.forEach((inek) => {
        const saniyelik = inek.haftalik / (7 * 24 * 60 * 60);
        kazanc += saniyelik * gecenSaniye;
      });

      if (kazanc > 0) {
        setCekilebilirBakiye((prev) => prev + kazanc);
        setBildirim(`💸 Offline sürede ${kazanc.toFixed(2)}₺ kazandın!`);
        setTimeout(() => setBildirim(""), 5000);
      }
    }

    setIlkYukleme(false);
  }, [ilkYukleme]);

  useEffect(() => {
    if (ilkYukleme) return;

    const hediyeVerildi = localStorage.getItem("hediyeVerildi") === "true";
    const ids = envanter.map((inek) => inek.id);
    const zatenAlindi = ids.includes("inek1svy");

    if (hediyeVerildi && oyunBakiyesi >= 100 && !zatenAlindi) {
      const inek = tumInekler["inek1svy"];
      setEnvanter((prev) => [...prev, inek]);
      setOyunBakiyesi((prev) => prev - 100);
      localStorage.setItem("hediyeVerildi", "false");
      alert("🎁 Hediye bakiyenizle 1 adet Beyaz İnek otomatik alındı.");
    }
  }, [ilkYukleme, oyunBakiyesi, envanter]);

  useEffect(() => {
    const interval = setInterval(() => {
      let saniyelikKazanc = 0;
      envanter.forEach((inek) => {
        saniyelikKazanc += inek.haftalik / (7 * 24 * 60 * 60);
      });
      setCekilebilirBakiye((prev) => prev + saniyelikKazanc);
    }, 1000);

    return () => clearInterval(interval);
  }, [envanter]);

  useEffect(() => {
    setBakiye(Number(oyunBakiyesi) + Number(cekilebilirBakiye));
  }, [oyunBakiyesi, cekilebilirBakiye]);

  useEffect(() => {
    if (ilkYukleme) return;
    localStorage.setItem("oyunBakiyesi", oyunBakiyesi.toString());
  }, [oyunBakiyesi]);

  useEffect(() => {
    if (ilkYukleme) return;
    localStorage.setItem("cekilebilirBakiye", cekilebilirBakiye.toString());
  }, [cekilebilirBakiye]);

  useEffect(() => {
    if (ilkYukleme) return;
    localStorage.setItem("envanter", JSON.stringify(envanter.map((i) => i.id)));
  }, [envanter, ilkYukleme]);

  useEffect(() => {
    if (ilkYukleme) return;
    if (kullaniciAdi) {
      localStorage.setItem("kullaniciAdi", kullaniciAdi);
    }
  }, [kullaniciAdi, ilkYukleme]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem("sonZaman", Date.now().toString());
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  return (
    <OyunContext.Provider
      value={{
        bakiye,
        oyunBakiyesi,
        setOyunBakiyesi,
        cekilebilirBakiye,
        setCekilebilirBakiye,
        envanter,
        setEnvanter,
        bildirim,
        tumInekler,
        kullaniciAdi,
        setKullaniciAdi,
      }}
    >
      {children}
    </OyunContext.Provider>
  );
};

export const useOyun = () => useContext(OyunContext);