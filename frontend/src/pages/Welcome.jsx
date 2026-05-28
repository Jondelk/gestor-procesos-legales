import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import {
  ClipboardDocumentCheckIcon,
  DocumentArrowDownIcon,
} from "@heroicons/react/24/outline";

function Welcome() {
  const navigate = useNavigate(); // ✅ navegación activada

  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-10 text-center">
        <div className="flex items-center justify-center gap-2 mb-8 text-sm font-medium">
          <span className="bg-[#0f7a67] text-white px-5 py-2 rounded-full">
            Paso 1
          </span>
          <span className="bg-slate-200 text-slate-500 px-5 py-2 rounded-full">
            Paso 2
          </span>
          <span className="bg-slate-200 text-slate-500 px-5 py-2 rounded-full">
            Paso 3
          </span>
        </div>

        <h1 className="text-5xl font-bold text-slate-800 mb-2">
          Bienvenido, configuremos tus procesos
        </h1>
        <p className="text-slate-500 text-xl mb-10">Paso 1 de 3</p>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* OPCIÓN 1 */}
          <div className="bg-white border-2 border-[#2e8b74] rounded-2xl p-8 shadow-sm text-left cursor-pointer hover:shadow-md transition">
            <div className="flex items-center gap-3 mb-6">
              <ClipboardDocumentCheckIcon className="w-8 h-8 text-[#2e8b74]" />
              <h3 className="text-3xl font-semibold text-slate-800">
                Registrar procesos manualmente
              </h3>
            </div>
            <p className="text-slate-600 text-lg">
              Registra y añade procesos judiciales de forma individual.
            </p>
          </div>

          {/* OPCIÓN 2 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm text-left cursor-pointer hover:shadow-md transition">
            <div className="flex items-center gap-3 mb-6">
              <DocumentArrowDownIcon className="w-8 h-8 text-[#2d5a9b]" />
              <h3 className="text-3xl font-semibold text-slate-800">
                Importar desde Excel
              </h3>
            </div>
            <p className="text-slate-600 text-lg">
              Sube un archivo de Excel para cargar múltiples procesos.
            </p>
          </div>
        </div>

        {/* BOTÓN FUNCIONAL */}
        <button
          onClick={() => navigate("/dashboard")}
          className="mt-10 rounded-lg bg-[#14834a] px-10 py-3 text-white font-semibold hover:bg-[#106b3c] transition"
        >
        Continuar
        </button>

        <p className="mt-4 text-slate-500">Paso 1 de 3</p>
      </main>
    </div>
  );
}

export default Welcome;