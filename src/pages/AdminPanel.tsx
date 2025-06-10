import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

type Talep = {
  id: string;
  aciklama: string;
  durum: string;
  gmail: string;
  islemTipi: string;
  kullaniciAdi: string;
  miktar: number;
  tarih: any;
  userId: string;
};

const AdminPanel = () => {
  const [talepler, setTalepler] = useState<Talep[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTalepler = async () => {
      setLoading(true);
      try {
        const talepCol = collection(db, "paraislemTalepleri");
        const q = query(talepCol, where("durum", "==", "beklemede"));
        const snapshot = await getDocs(q);

        const liste: Talep[] = [];
        snapshot.forEach((doc) => {
          liste.push({ id: doc.id, ...doc.data() } as Talep);
        });
        setTalepler(liste);
      } catch (error) {
        console.error("Talep çekme hatası:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTalepler();
  }, []);

  const guncelleDurum = async (id: string, yeniDurum: string) => {
    try {
      const talepRef = doc(db, "paraislemTalepleri", id);
      await updateDoc(talepRef, { durum: yeniDurum });
      setTalepler((prev) => prev.filter((t) => t.id !== id));
      alert(`Talep ${yeniDurum} olarak güncellendi.`);
    } catch (error) {
      alert("Güncelleme sırasında hata oluştu.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Admin Panel - Para İşlem Talepleri</h1>

      {loading && <p>Yükleniyor...</p>}
      {!loading && talepler.length === 0 && <p>Beklemede talep yok.</p>}

      <ul className="space-y-4">
        {talepler.map((talep) => (
          <li
            key={talep.id}
            className="bg-white p-4 rounded shadow flex flex-col md:flex-row md:items-center md:justify-between"
          >
            <div>
              <p>
                <strong>Kullanıcı:</strong> {talep.kullaniciAdi}
              </p>
              <p>
                <strong>Gmail:</strong> {talep.gmail}
              </p>
              <p>
                <strong>İşlem Tipi:</strong> {talep.islemTipi}
              </p>
              <p>
                <strong>Miktar:</strong> {talep.miktar} ₺
              </p>
              <p>
                <strong>Açıklama:</strong> {talep.aciklama || "-"}
              </p>
              <p>
                <strong>Tarih:</strong>{" "}
                {talep.tarih ? talep.tarih.toDate().toLocaleString() : "Belirtilmemiş"}
              </p>
            </div>

            <div className="mt-4 md:mt-0 space-x-2">
              <button
                onClick={() => guncelleDurum(talep.id, "onaylandi")}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Onayla
              </button>
              <button
                onClick={() => guncelleDurum(talep.id, "reddedildi")}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Reddet
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;