import React from 'react';
import { useOyun } from '../context/OyunContext';
import { useNavigate } from 'react-router-dom';

const Profil = () => {
  const { bakiye, envanter, kullaniciAdi } = useOyun();
  const navigate = useNavigate();

  // localStorage'dan son giriş zamanını al
  const sonZaman = localStorage.getItem('sonZaman');
  const sonGirisTarihi = sonZaman
    ? new Date(parseInt(sonZaman)).toLocaleString('tr-TR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    : 'Bilinmiyor';

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">👤 Profil</h1>

      {/* Avatar */}
      <div className="w-24 h-24 rounded-full bg-green-500 text-white flex items-center justify-center text-4xl mb-4 shadow-md">
        {kullaniciAdi?.charAt(0)?.toUpperCase() || "?"}
      </div>

      {/* Bilgi Kutusu */}
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md space-y-2">
        <p className="text-lg"><strong>Kullanıcı Adı:</strong> {kullaniciAdi || "Bilinmiyor"}</p>
        <p className="text-lg"><strong>Bakiye:</strong> {bakiye.toFixed(3)}₺</p>
        <p className="text-lg"><strong>İnek Sayısı:</strong> {envanter.length}</p>
        <p className="text-lg"><strong>Son Giriş Tarihi:</strong> {sonGirisTarihi}</p>
      </div>

      <button
        onClick={() => navigate('/')}
        className="mt-8 bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-xl shadow"
      >
        🏠 Ana Sayfaya Dön
      </button>
    </div>
  );
};

export default Profil;