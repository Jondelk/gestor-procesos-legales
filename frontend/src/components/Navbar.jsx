import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Squares2X2Icon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const nombre = localStorage.getItem("nombre");
    const token = localStorage.getItem("token");

    if (token && nombre) {
      setUser(nombre);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("nombre");
    navigate("/login");
  };

  return (
    <header className="w-full bg-gradient-to-r from-[#163b78] to-[#224f95] text-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate(user ? "/dashboard" : "/")}
        >
          <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center border border-white/20">
            <Squares2X2Icon className="w-5 h-5 text-white" />
          </div>

          <div className="leading-tight">
            <h1 className="text-lg font-semibold">
              Gestor de Procesos Legales
            </h1>
            <p className="text-xs text-white/75">(Colombia)</p>
          </div>
        </div>

        {!user ? (
          <button
            onClick={() => navigate("/login")}
            className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-[#163b78] hover:bg-slate-100 transition"
          >
            <UserCircleIcon className="w-5 h-5" />
            Iniciar sesión
          </button>
        ) : (
          <div className="flex items-center gap-3">

            <button
              onClick={() => navigate("/dashboard")}
              className="bg-[#14834a] px-4 py-2 rounded-md text-sm font-semibold hover:bg-[#106b3c] transition"
            >
              Procesos
            </button>

            <button
              onClick={() => navigate("/pendientes")}
              className="bg-[#14834a] px-4 py-2 rounded-md text-sm font-semibold hover:bg-[#106b3c] transition"
            >
              Pendientes
            </button>

            <button
              onClick={() => navigate("/calculo-dias")}
              className="bg-[#14834a] px-4 py-2 rounded-md text-sm font-semibold hover:bg-[#106b3c] transition"
            >
              Días hábiles
            </button>

            <button
              onClick={() => navigate("/estados")}
              className="bg-[#14834a] px-4 py-2 rounded-md text-sm font-semibold hover:bg-[#106b3c] transition"
            >
              Estados
            </button>

            <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg border border-white/20">
              <UserCircleIcon className="w-5 h-5" />
              <span className="text-sm font-medium">{user}</span>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-white text-[#163b78] px-3 py-2 rounded-md text-sm font-semibold hover:bg-slate-100 transition"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
              Salir
            </button>

          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;