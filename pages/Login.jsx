import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [sifre, setSifre] = useState("");
  const navigate = useNavigate();

  const girisYap = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, sifre);
      alert("Giriş başarılı!");
      navigate("/home");
    } catch (err) {
      alert("Hata: " + err.message);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>🔐 Giriş Yap</h2>

      <input
        type="email"
        placeholder="E-posta"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: 10, marginBottom: 10, width: "250px" }}
      />
      <br />
      <input
        type="password"
        placeholder="Şifre"
        value={sifre}
        onChange={(e) => setSifre(e.target.value)}
        style={{ padding: 10, marginBottom: 10, width: "250px" }}
      />
      <br />
      <button
        onClick={girisYap}
        style={{ padding: "10px 20px", backgroundColor: "#4CAF50", color: "white", border: "none" }}
      >
        Giriş Yap
      </button>

      <p style={{ marginTop: 10 }}>
        Hesabınız yok mu?{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => navigate("/register")}
        >
          Kayıt Ol
        </span>
      </p>
    </div>
  );
};

export default Login;