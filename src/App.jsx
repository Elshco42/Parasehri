import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "./firebase";

import { OyunProvider, useOyun } from "./context/OyunContext";

import AnaSayfa from "./pages/AnaSayfa";
import Market from "./pages/Market";
import Envanter from "./pages/Envanter";
import Profil from "./pages/Profil";
import ParaIslem from "./pages/ParaIslem";
import Gelir from "./pages/Gelir";
import GirisKayit from "./pages/GirisKayit";
import AdminPanel from "./pages/AdminPanel";

function App() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        const userDocRef = doc(db, "kullanicilar", u.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const data = userDocSnap.data();
          setIsAdmin(data.isAdmin || false);
        } else {
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div>Yükleniyor...</div>;

  return (
    <OyunProvider>
      <Router>
        <UstMenu user={user} isAdmin={isAdmin} />
        <Routes>
          {!user ? (
            <>
              <Route path="/giris" element={<GirisKayit />} />
              <Route path="*" element={<Navigate to="/giris" replace />} />
            </>
          ) : isAdmin ? (
            <>
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="*" element={<Navigate to="/admin" replace />} />
            </>
          ) : (
            <>
              <Route path="/" element={<AnaSayfa />} />
              <Route path="/market" element={<Market />} />
              <Route path="/envanter" element={<Envanter />} />
              <Route path="/profil" element={<Profil />} />
              <Route path="/paraislem" element={<ParaIslem />} />
              <Route path="/gelir" element={<Gelir />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}
        </Routes>
      </Router>
    </OyunProvider>
  );
}

const UstMenu = ({ user, isAdmin }) => {
  const { kullaniciAdi } = useOyun();

  const handleLogout = () => {
    localStorage.setItem("sonZaman", String(Date.now()));
    signOut(auth).then(() => (window.location.href = "/giris"));
  };

  return (
    <div className="flex justify-between items-center px-4 py-3 bg-green-100 shadow">
      <h3 className="text-xl font-bold text-green-800">🐮 ParaŞehri</h3>
      {user && (
        <div className="flex items-center gap-4">
          <span className="text-sm text-green-900 font-medium">
            👋 Hoş geldin, <strong>{kullaniciAdi || "Oyuncu"}</strong>{" "}
            {isAdmin && <span className="ml-2 text-yellow-600 font-semibold">(Admin)</span>}
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded shadow"
          >
            🔒 Çıkış Yap
          </button>
        </div>
      )}
    </div>
  );
};

export default App;