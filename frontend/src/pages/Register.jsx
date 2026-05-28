import { useState } from "react";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

function Register() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await register({
      nombre,
      email,
      password
    });

    localStorage.setItem("token", res.token);
    localStorage.setItem("nombre", nombre);

    navigate("/welcome");
  } catch (error) {
    console.log(error.response?.data || error.message);
    alert("Error al registrar usuario");
  }
};

  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-[1.15fr_0.85fr] gap-6 items-stretch">
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-10">
            <h2 className="text-4xl font-bold text-slate-800 mb-8">Crear cuenta</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">
                  Nombre
                </label>
                <div className="relative">
                  <UserIcon className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Camilo"
                    className="w-full rounded-lg border border-slate-300 bg-white pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-[#1f7a63] focus:border-[#1f7a63]"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">
                  Email
                </label>
                <div className="relative">
                  <EnvelopeIcon className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    placeholder="camilo@example.com"
                    className="w-full rounded-lg border border-slate-300 bg-white pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-[#1f7a63] focus:border-[#1f7a63]"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <LockClosedIcon className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-slate-300 bg-white pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-[#1f7a63] focus:border-[#1f7a63]"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm text-slate-600">
                <CheckCircleIcon className="w-5 h-5 text-[#1f7a63]" />
                Acepto los términos y condiciones
              </label>

              <button
                type="submit"
                className="w-full rounded-lg bg-[#14834a] py-3 text-white font-semibold hover:bg-[#106b3c] transition"
              >
                Crear cuenta
              </button>

              <button
                type="button"
                onClick={() => navigate("/login")}
                className="w-full text-[#2d5a9b] font-medium py-2 hover:underline"
              >
                Iniciar sesión
              </button>
            </form>
          </section>

          <aside className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-3xl font-bold text-slate-800 mb-3">
                Tu información es privada
              </h3>
              <p className="text-slate-500 mb-6">
                Multi-tenant: solo ves tus procesos.
              </p>

              <ul className="space-y-4 text-slate-700">
                <li className="flex items-center gap-3">
                  <CheckCircleIcon className="w-6 h-6 text-[#1f7a63]" />
                  <span><strong>Encriptamos</strong> tus datos</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircleIcon className="w-6 h-6 text-[#1f7a63]" />
                  <span><strong>Cumplimos</strong> regulaciones locales</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircleIcon className="w-6 h-6 text-[#1f7a63]" />
                  <span><strong>No compartimos</strong> tu información.</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 rounded-2xl bg-[#eef5f8] p-6 flex items-center justify-center">
              <div className="relative w-full max-w-[280px] h-[200px]">
                <div className="absolute inset-0 rounded-full bg-[#dfecef]" />
                <div className="absolute left-3 bottom-3 w-28 h-20 bg-white rounded-xl shadow border border-slate-200 flex items-center justify-center">
                  <ShieldCheckIcon className="w-12 h-12 text-[#2e8b74]" />
                </div>
                <div className="absolute right-2 bottom-6 w-24 h-28 bg-[#f7ecd5] rounded-xl shadow border border-slate-200 flex items-center justify-center">
                  <DocumentTextIcon className="w-10 h-10 text-[#8d8d8d]" />
                </div>
                <div className="absolute top-3 right-10 w-10 h-10 rounded-full bg-white shadow border border-slate-200 flex items-center justify-center">
                  <ShieldCheckIcon className="w-5 h-5 text-[#2e8b74]" />
                </div>
              </div>
            </div>
          </aside>
        </div>

        <footer className="text-center text-sm text-slate-500 mt-10">
          © 2026 Gestor de Procesos Legales | Todos los derechos reservados.
        </footer>
      </main>
    </div>
  );
}

export default Register;