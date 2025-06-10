import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Referans = () => {
  const navigate = useNavigate();
  const [kopyalandı, setKopyalandı] = useState(false);

  const referansKodu = "ABCD1234"; // Gerçek sistemde kullanıcıya özel olur
  const toplamDavet = 3; // Sahte veri
  const kazanilanOdul = toplamDavet * 10; // Kişi başı 10₺ kazanç

  const kopyala = () => {
    navigator.clipboard.writeText(referansKodu);
    setKopyalandı(true);
    setTimeout(() => setKopyalandı(false), 2000);
  };

  return (
    <div className="min-h-screen bg-yellow-50 flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-6">🤝 Referans Sistemi</h1>

      <div className="bg-white rounded-xl shadow p-6 w-full max-w-md text-center">
        <p className="text-lg font-semibold">Senin Referans Kodun:</p>
        <div className="flex justify-center items-center mt-2 mb-4">
          <span className="font-mono bg-gray-100 px-4 py-1 rounded-l">{referansKodu}</span>
          <button
            onClick={kopyala}
            className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-1 rounded-r"
          >
            {kopyalandı ? 'Kopyalandı!' : 'Kopyala'}
          </button>
        </div>

        <p>Toplam Davet: <strong>{toplamDavet}</strong> kişi</p>
        <p>Kazandığın Ödül: <strong>{kazanilanOdul}₺</strong></p>
      </div>

      <button
        onClick={() => navigate('/')}
        className="mt-8 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-6 rounded-xl shadow"
      >
        🏠 Ana Sayfaya Dön
      </button>
    </div>
  );
};

export default Referans;