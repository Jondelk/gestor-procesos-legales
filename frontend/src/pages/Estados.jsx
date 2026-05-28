import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { analizarPDF, obtenerActuaciones } from "../services/estadoService";
import {
  DocumentArrowUpIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

function Estados() {
  const [pdf, setPdf] = useState(null);
  const [actuaciones, setActuaciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const cargarActuaciones = async () => {
    try {
      const data = await obtenerActuaciones();
      setActuaciones(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error cargando actuaciones:", error);
      setActuaciones([]);
    }
  };

  useEffect(() => {
    cargarActuaciones();
  }, []);

  const handleAnalizar = async () => {
    if (!pdf) {
      alert("Selecciona un archivo PDF");
      return;
    }

    try {
      setLoading(true);
      setMensaje("");

      const formData = new FormData();
      formData.append("pdf", pdf);

      const res = await analizarPDF(formData);

      setMensaje(
        `Análisis completado. Cambios detectados: ${res.totalCambios}`
      );

      await cargarActuaciones();
    } catch (error) {
      console.error("Error analizando PDF:", error);
      alert("Error al analizar el PDF");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-slate-800 mb-6">
          Estados Judiciales
        </h1>

        <section className="bg-white rounded-xl shadow p-6 mb-8">
          <div className="flex items-center gap-3 mb-5">
            <DocumentArrowUpIcon className="w-8 h-8 text-[#1f7a63]" />
            <div>
              <h2 className="text-xl font-bold text-slate-800">
                Subir PDF de Estado Judicial
              </h2>
              <p className="text-slate-500 text-sm">
                Carga el PDF publicado por el juzgado para detectar cambios en
                tus procesos.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-center">
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setPdf(e.target.files[0])}
              className="w-full border border-slate-300 rounded-lg p-3 bg-white"
            />

            <button
              onClick={handleAnalizar}
              disabled={loading}
              className="flex items-center gap-2 bg-[#14834a] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#106b3c] transition disabled:opacity-60"
            >
              <MagnifyingGlassIcon className="w-5 h-5" />
              {loading ? "Analizando..." : "Analizar Estado"}
            </button>
          </div>

          {mensaje && (
            <div className="mt-5 bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg">
              {mensaje}
            </div>
          )}
        </section>

        <section className="bg-white rounded-xl shadow overflow-hidden">
          <div className="p-5 border-b">
            <h2 className="text-xl font-bold text-slate-800">
              Historial de actuaciones detectadas
            </h2>
          </div>

          <table className="w-full text-left">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-3">Radicado</th>
                <th>Descripción</th>
                <th>Fuente</th>
                <th>Fecha</th>
              </tr>
            </thead>

            <tbody>
              {actuaciones.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-slate-500">
                    No hay actuaciones detectadas
                  </td>
                </tr>
              ) : (
                actuaciones.map((a) => (
                  <tr key={a._id} className="border-t">
                    <td className="p-3 font-medium">{a.radicado}</td>
                    <td>{a.descripcion}</td>
                    <td>{a.fuente}</td>
                    <td>
                      {new Date(a.fechaDeteccion || a.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

export default Estados;