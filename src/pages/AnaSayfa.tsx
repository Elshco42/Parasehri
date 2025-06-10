import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOyun } from '../context/OyunContext';

const AnaSayfa = () => {
  const navigate = useNavigate();
  const { bakiye, vip } = useOyun();

  // Bakiye kontrolü ve formatlama
  const formatliBakiye = typeof bakiye === "number" && !isNaN(bakiye)
    ? bakiye.toFixed(2)
    : "0.00";

  // Çıkış işlemi (sayfa yenilenmez)
  const handleCikis = () => {
    localStorage.setItem("sonZaman", String(Date.now()));
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-100 bg-[url('/pattern.svg')] bg-fixed bg-cover flex flex-col items-center justify-start p-4 sm:p-6">
      {/* Hoş Geldin Başlığı + VIP etiketi */}
      <div className="w-full max-w-md text-center mb-6 px-2">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-green-700 drop-shadow-sm">🏡 ParaŞehri</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1">
          {vip ? (
            <span className="inline-block bg-yellow-400 text-white font-semibold px-3 py-1 rounded-full mt-2 animate-pulse">
              🌟 VIP Üye
            </span>
          ) : (
            <span className="inline-block bg-gray-300 text-gray-800 font-medium px-3 py-1 rounded-full mt-2">
              👤 Normal Kullanıcı
            </span>
          )}
        </p>
      </div>

      {/* Bakiye Paneli */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border-4 border-green-300 px-6 py-5 mb-6 text-center sm:px-8 sm:py-6">
        <p className="text-lg text-gray-700 font-semibold">Mevcut Bakiyen</p>
        <p className="text-4xl sm:text-5xl text-green-600 font-extrabold tracking-widest mt-2 animate-pulse break-words">
          {formatliBakiye} ₺
        </p>
        <p className="text-xs text-gray-500 mt-1">Her saniye otomatik kazanç ekleniyor</p>
      </div>

      {/* Menü Butonları */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md mb-6 px-2">
        <button
          onClick={() => navigate('/market')}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 rounded-xl shadow-lg transition"
        >
          🛒 Market
        </button>
        <button
          onClick={() => navigate('/envanter')}
          className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-4 rounded-xl shadow-lg transition"
        >
          📦 Envanter
        </button>
        <button
          onClick={() => navigate('/gelir')}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-4 rounded-xl shadow-lg transition"
        >
          💰 Gelir
        </button>
        <button
          onClick={() => navigate('/profil')}
          className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-4 rounded-xl shadow-lg transition"
        >
          👤 Profil
        </button>
        <button
          onClick={() => navigate('/paraislem')}
          className="col-span-1 sm:col-span-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-4 rounded-xl shadow-lg transition"
        >
          💳 Para İşlem
        </button>
      </div>

      {/* Çıkış Butonu */}
      <button
        onClick={handleCikis}
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl shadow-md transition duration-200"
      >
        🔒 Çıkış Yap
      </button>
    </div>
  );
};

export default AnaSayfa;