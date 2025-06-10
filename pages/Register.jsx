import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [sifre, setSifre] = useState("");
  const navigate = useNavigate();

  const kayitOl = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, sifre);
      const uid = userCredential.user.uid;

      await setDoc(doc(db, "kullanicilar", uid), {
        email,
        bakiye: 50,
        hayvanlar: [
          {
            isim: "Beyaz İnek",
            adet: 1,
            kazanc: 2
          }
        ]
      });

      alert("Kayıt başarılı! Giriş yapabilirsiniz.");
      navigate("/login");
    } catch (err) {
      alert("Hata: " + err.message);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>📝 Kayıt Ol</h2>

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
        onClick={kayitOl}
        style={{ padding: "10px 20px", backgroundColor: "#2196F3", color: "white", border: "none" }}
      >
        Kayıt Ol
      </button>

      <p style={{ marginTop: 10 }}>
        Zaten hesabınız var mı?{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => navigate("/login")}
        >
          Giriş Yap
        </span>
      </p>
    </div>
  );
};

export default Register;