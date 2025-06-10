import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [sifre, setSifre] = useState("");
  const [kullaniciAdi, setKullaniciAdi] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      await createUserWithEmailAndPassword(auth, email, sifre);

      localStorage.setItem("oyunBakiyesi", "100");
      localStorage.setItem("cekilebilirBakiye", "0");
      localStorage.setItem("envanter", JSON.stringify([]));
      localStorage.setItem("kullaniciAdi", kullaniciAdi);
      localStorage.setItem("hediyeVerildi", "true");

      setTimeout(() => {
        alert("🎉 Kayıt başarılı! 100₺ hediye bakiye verildi.");
        navigate("/home");
      }, 500); // Gecikmeyi 500ms yaptım, localStorage işleminin bitmesi için
    } catch (error) {
      alert("Kayıt hatası: " + error.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Kayıt Ol</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Kullanıcı Adı"
          value={kullaniciAdi}
          onChange={(e) => setKullaniciAdi(e.target.value)}
          required
        />
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
        <button type="submit">Kayıt Ol ve Başla</button>
      </form>
    </div>
  );
};

export default Register;