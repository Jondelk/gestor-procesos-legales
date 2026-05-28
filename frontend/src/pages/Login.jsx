import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  EnvelopeIcon,
  LockClosedIcon,
  BellAlertIcon,
  CalendarDaysIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await login({ email, password });

    localStorage.setItem("token", res.token);
    localStorage.setItem("nombre", res.nombre || email);

    navigate("/dashboard");
  } catch (error) {
    alert("Credenciales incorrectas");
  }
};

  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-8 items-center">
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-10">
            <h2 className="text-4xl font-bold text-center text-slate-800 mb-8">
              Iniciar sesión
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">
                  Email
                </label>
                <div className="relative">
                  <EnvelopeIcon className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full rounded-lg border border-slate-300 pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-[#1f7a63] focus:border-[#1f7a63]"
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
                    placeholder="Contraseña"
                    className="w-full rounded-lg border border-slate-300 pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-[#1f7a63] focus:border-[#1f7a63]"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-[#14834a] py-3 text-white font-semibold hover:bg-[#106b3c] transition"
              >
                Ingresar
              </button>

              <div className="flex justify-between text-sm pt-2">
                <button type="button" className="text-slate-500 hover:text-slate-700">
                  Olvidé mi contraseña
                </button>
                <button
                  type="button"
                  className="text-[#2d5a9b] font-medium hover:underline"
                  onClick={() => navigate("/")}
                >
                  Crear cuenta
                </button>
              </div>
            </form>
          </section>

          <aside className="space-y-6">
            <div>
              <h3 className="text-5xl font-bold text-slate-800 leading-tight">
                Gestión eficiente de tus
                <span className="block text-[#2d4f7f]">procesos judiciales</span>
              </h3>
            </div>

            <div className="rounded-2xl bg-[#edf3fb] border border-slate-200 p-6 shadow-sm">
              <div className="rounded-xl bg-white border border-slate-200 shadow-sm p-4">
                <div className="h-3 w-40 bg-slate-200 rounded mb-4"></div>
                <div className="space-y-3">
                  <div className="h-10 rounded bg-slate-100"></div>
                  <div className="h-10 rounded bg-slate-100"></div>
                  <div className="h-10 rounded bg-slate-100"></div>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex gap-3">
                <BellAlertIcon className="w-7 h-7 text-[#2d5a9b]" />
                <div>
                  <h4 className="font-semibold text-slate-800">Alertas Automáticas</h4>
                  <p className="text-slate-500 text-sm">
                    Recibe notificaciones de cambios en tus procesos.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <CalendarDaysIcon className="w-7 h-7 text-[#2d5a9b]" />
                <div>
                  <h4 className="font-semibold text-slate-800">Vencimientos en Días Hábiles</h4>
                  <p className="text-slate-500 text-sm">
                    Calculamos fechas límite de manera exacta.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <ClockIcon className="w-7 h-7 text-[#2d5a9b]" />
                <div>
                  <h4 className="font-semibold text-slate-800">Historial Completo</h4>
                  <p className="text-slate-500 text-sm">
                    Consulta todas las actuaciones publicadas por los juzgados.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <footer className="text-center text-sm text-slate-500 mt-10">
          Términos y condiciones | Política de privacidad | Ayuda
          <div className="mt-2">© 2026 Gestor de Procesos Legales. Todos los derechos reservados.</div>
        </footer>
      </main>
    </div>
  );
}

export default Login;