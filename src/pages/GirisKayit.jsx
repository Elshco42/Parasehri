import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function GirisKayit() {
  const [email, setEmail] = useState("");
  const [sifre, setSifre] = useState("");
  const [kullaniciAdi, setKullaniciAdi] = useState("");
  const [isKayit, setIsKayit] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isKayit) {
      try {
        await createUserWithEmailAndPassword(auth, email, sifre);
        // Kayıt sonrası yönlendirme
        alert("Kayıt başarılı!");
        navigate("/");
      } catch (error) {
        alert("Kayıt hatası: " + error.message);
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, sifre);
        alert("Giriş başarılı!");
        navigate("/");
      } catch (error) {
        alert("Giriş hatası: " + error.message);
      }
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>{isKayit ? "Kayıt Ol" : "Giriş Yap"}</h2>
      {isKayit && (
        <input
          type="text"
          placeholder="Kullanıcı Adı"
          value={kullaniciAdi}
          onChange={(e) => setKullaniciAdi(e.target.value)}
          required
        />
      )}
      <br />
      <input
        type="email"
        placeholder="E-posta"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <br />
      <input
        type="password"
        placeholder="Şifre"
        value={sifre}
        onChange={(e) => setSifre(e.target.value)}
        required
      />
      <br />
      <button onClick={handleSubmit}>{isKayit ? "Kayıt Ol" : "Giriş Yap"}</button>
      <p onClick={() => setIsKayit(!isKayit)} style={{ cursor: "pointer", color: "blue" }}>
        {isKayit ? "Zaten hesabın var mı? Giriş Yap" : "Hesabın yok mu? Kayıt Ol"}
      </p>
    </div>
  );
}