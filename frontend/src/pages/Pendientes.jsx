import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getProcesosPendientes } from "../services/procesoService";

function Pendientes() {
  const [procesos, setProcesos] = useState([]);

  const fetchPendientes = async () => {
    try {
      const res = await getProcesosPendientes();

      const data = Array.isArray(res)
        ? res
        : res.procesos || [];

      setProcesos(data);
    } catch (error) {
      console.error("Error cargando procesos pendientes:", error);
      setProcesos([]);
    }
  };

  useEffect(() => {
    fetchPendientes();
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-slate-800 mb-6">
          Procesos Pendientes
        </h1>

        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full min-w-[1100px] text-left">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-3">Radicado</th>
                <th className="p-3">Juzgado</th>
                <th className="p-3">Demandante</th>
                <th className="p-3">Demandado</th>
                <th className="p-3">Etapa procesal</th>
                <th className="p-3">Actuación pendiente</th>
                <th className="p-3">Estado</th>
              </tr>
            </thead>

            <tbody>
              {procesos.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-4 text-center text-slate-500">
                    No hay procesos pendientes
                  </td>
                </tr>
              ) : (
                procesos.map((p) => (
                  <tr key={p._id} className="border-t">
                    <td className="p-3">{p.radicado}</td>
                    <td className="p-3">{p.juzgado}</td>
                    <td className="p-3">{p.demandante}</td>
                    <td className="p-3">{p.demandado}</td>
                    <td className="p-3">{p.etapaProcesal || "—"}</td>
                    <td className="p-3">{p.actuacionPendiente || "—"}</td>
                    <td className="p-3">
                      <span className="px-2 py-1 rounded text-sm bg-yellow-100 text-yellow-700">
                        {p.estado}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Pendientes;