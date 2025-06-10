import React from "react";
import { useNavigate } from "react-router-dom";

const CikisYap = () => {
  const navigate = useNavigate();

  const handleCikis = () => {
    localStorage.setItem("sonZaman", String(Date.now()));
    navigate("/login");
  };

  return (
    <button
      type="button"
      onClick={handleCikis}
      className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow"
    >
      🔒 Çıkış Yap
    </button>
  );
};

export default CikisYap;
