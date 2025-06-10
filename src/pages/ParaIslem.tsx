import React, { useState } from "react";  
import { db, auth } from "../firebase";  
import { collection, addDoc, serverTimestamp } from "firebase/firestore";  

const iban = "TR600001000178914499985001";  
const aliciIsim = "Elshan Hajiyev";  

const bankalar = [
  "Akbank",
  "Garanti BBVA",
  "İş Bankası",
  "Ziraat Bankası",
  "Halkbank",
  "VakıfBank",
];

const ParaIslem = () => {  
  const [islemTipi, setIslemTipi] = useState("yatir");  
  const [miktar, setMiktar] = useState("");  
  const [gmail, setGmail] = useState("");  
  const [aciklama, setAciklama] = useState("");  

  // Para çekme için ek alanlar
  const [seciliBanka, setSeciliBanka] = useState(bankalar[0]);
  const [hesapNoIban, setHesapNoIban] = useState("");

  const [mesajGonderildi, setMesajGonderildi] = useState(false);  

  const handleSubmit = async (e) => {  
    e.preventDefault();  

    if (islemTipi === "cek" && (!hesapNoIban.trim() || !seciliBanka)) {
      alert("Lütfen banka ve IBAN/Hesap numarasını doldurun.");
      return;
    }

    try {  
      await addDoc(collection(db, "paraIslemTalepleri"), {  
        userId: auth.currentUser.uid,  
        kullaniciAdi: auth.currentUser.displayName || "",  
        islemTipi,  
        miktar: Number(miktar),  
        gmail,  
        aciklama,
        banka: islemTipi === "cek" ? seciliBanka : "",  
        ibanHesapNo: islemTipi === "cek" ? hesapNoIban : "",
        durum: "beklemede",  
        tarih: serverTimestamp(),  
      });  

      setMesajGonderildi(true);  
      setTimeout(() => setMesajGonderildi(false), 4000);  

      setMiktar("");  
      setGmail("");  
      setAciklama("");  
      setHesapNoIban("");
      setSeciliBanka(bankalar[0]);
    } catch (error) {  
      alert("Talep gönderilirken hata oluştu: " + error.message);  
    }  
  };  

  return (  
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">  
      <h1 className="text-2xl font-bold mb-4">💳 Para İşlem Talebi</h1>  

      <div className="mb-4">  
        <button  
          onClick={() => setIslemTipi("yatir")}  
          className={`mr-2 px-4 py-2 rounded ${  
            islemTipi === "yatir" ? "bg-green-500 text-white" : "bg-white border"  
          }`}  
        >  
          Para Yatır  
        </button>  
        <button  
          onClick={() => setIslemTipi("cek")}  
          className={`px-4 py-2 rounded ${  
            islemTipi === "cek" ? "bg-red-500 text-white" : "bg-white border"  
          }`}  
        >  
          Para Çek  
        </button>  
      </div>  

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow w-full max-w-md">  
        {islemTipi === "yatir" && (  
          <div className="mb-4">  
            <p className="font-medium mb-1">Ziraat Bankası IBAN:</p>  
            <p className="bg-gray-100 p-2 rounded font-mono">{iban}</p>  
            <p className="text-sm text-gray-600 mt-1">  
              Alıcı: <strong>{aliciIsim}</strong>  
            </p>  
            <p className="text-sm text-gray-600 mt-2">  
              Açıklama kısmına <strong>kayıt olduğun Gmail adresini</strong> yaz ve dekontu admin’e gönder.  
            </p>  
          </div>  
        )}

        {islemTipi === "cek" && (
          <>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Banka Seç</label>
              <select
                value={seciliBanka}
                onChange={(e) => setSeciliBanka(e.target.value)}
                className="w-full border p-2 rounded"
                required
              >
                {bankalar.map((banka) => (
                  <option key={banka} value={banka}>{banka}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium">IBAN veya Hesap Numarası</label>
              <input
                type="text"
                value={hesapNoIban}
                onChange={(e) => setHesapNoIban(e.target.value)}
                placeholder="IBAN veya Hesap Numarası giriniz"
                className="w-full border p-2 rounded"
                required
              />
            </div>
          </>
        )}

        <div className="mb-4">  
          <label className="block mb-1 font-medium">İşlem Tutarı (₺)</label>  
          <input  
            type="number"  
            required  
            value={miktar}  
            onChange={(e) => setMiktar(e.target.value)}  
            className="w-full border p-2 rounded"  
          />  
        </div>  

        <div className="mb-4">  
          <label className="block mb-1 font-medium">Gmail Adresin</label>  
          <input  
            type="email"  
            required  
            value={gmail}  
            onChange={(e) => setGmail(e.target.value)}  
            className="w-full border p-2 rounded"  
          />  
        </div>  

        <div className="mb-4">  
          <label className="block mb-1 font-medium">Açıklama (isteğe bağlı)</label>  
          <textarea  
            value={aciklama}  
            onChange={(e) => setAciklama(e.target.value)}  
            className="w-full border p-2 rounded"  
          />  
        </div>  

        <button  
          type="submit"  
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"  
        >  
          {islemTipi === "yatir" ? "Yatırma Talebi Gönder" : "Çekme Talebi Gönder"}  
        </button>  
      </form>  

      {mesajGonderildi && (  
        <div className="mt-4 text-green-700 font-semibold">  
          Talebin admin’e iletildi. Onay sonrası bakiyen güncellenecek.  
        </div>  
      )}  
    </div>  
  );  
};  

export default ParaIslem;