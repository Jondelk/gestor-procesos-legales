import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  getProcesos,
  createProceso,
  updateProceso,
  deleteProceso
} from "../services/procesoService";
import { calcularDiasHabiles } from "../services/calculoService";

function Dashboard() {
  const [procesos, setProcesos] = useState([]);
  const [radicado, setRadicado] = useState("");
  const [juzgado, setJuzgado] = useState("");
  const [demandante, setDemandante] = useState("");
  const [demandado, setDemandado] = useState("");
  const [etapaProcesal, setEtapaProcesal] = useState("");
  const [actuacionPendiente, setActuacionPendiente] = useState("");
  const [editando, setEditando] = useState(null);

  const [diasPorProceso, setDiasPorProceso] = useState({});
  const [vencimientos, setVencimientos] = useState({});

  const limpiarFormulario = () => {
    setRadicado("");
    setJuzgado("");
    setDemandante("");
    setDemandado("");
    setEtapaProcesal("");
    setActuacionPendiente("");
    setEditando(null);
  };

  const fetchProcesos = async () => {
    try {
      const res = await getProcesos();
      const data = Array.isArray(res) ? res : res.procesos || [];
      setProcesos(data);
    } catch (error) {
      console.error("Error cargando procesos:", error);
      setProcesos([]);
    }
  };

  useEffect(() => {
    fetchProcesos();
  }, []);

  const handleSave = async () => {
    try {
      const procesoData = {
        radicado,
        juzgado,
        demandante,
        demandado,
        etapaProcesal,
        actuacionPendiente
      };

      if (editando) {
        await updateProceso(editando, procesoData);
      } else {
        await createProceso(procesoData);
      }

      limpiarFormulario();
      fetchProcesos();
    } catch (error) {
      console.error("Error guardando proceso:", error);
    }
  };

  const handleEdit = (p) => {
    setEditando(p._id);
    setRadicado(p.radicado || "");
    setJuzgado(p.juzgado || "");
    setDemandante(p.demandante || "");
    setDemandado(p.demandado || "");
    setEtapaProcesal(p.etapaProcesal || "");
    setActuacionPendiente(p.actuacionPendiente || "");
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar este proceso?")) return;

    try {
      await deleteProceso(id);
      fetchProcesos();
    } catch (error) {
      console.error("Error eliminando:", error);
    }
  };

  const handleCalcular = async (proceso) => {
    try {
      const diasHabiles = Number(diasPorProceso[proceso._id] || 0);

      if (!diasHabiles || diasHabiles <= 0) {
        alert("Ingresa un número válido de días hábiles");
        return;
      }

      const res = await calcularDiasHabiles({
        fechaInicio: proceso.createdAt,
        diasHabiles
      });

      setVencimientos((prev) => ({
        ...prev,
        [proceso._id]: res.fechaVencimiento
      }));
    } catch (error) {
      console.error("Error calculando días hábiles:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-slate-800 mb-6">
          Gestión de Procesos
        </h1>

        <div className="bg-white p-6 rounded-xl shadow mb-6 grid grid-cols-2 gap-4">
          <input
            placeholder="Radicado"
            className="border p-3 rounded"
            value={radicado}
            onChange={(e) => setRadicado(e.target.value)}
          />

          <input
            placeholder="Juzgado"
            className="border p-3 rounded"
            value={juzgado}
            onChange={(e) => setJuzgado(e.target.value)}
          />

          <input
            placeholder="Demandante"
            className="border p-3 rounded"
            value={demandante}
            onChange={(e) => setDemandante(e.target.value)}
          />

          <input
            placeholder="Demandado"
            className="border p-3 rounded"
            value={demandado}
            onChange={(e) => setDemandado(e.target.value)}
          />

          <input
            placeholder="Etapa procesal"
            className="border p-3 rounded"
            value={etapaProcesal}
            onChange={(e) => setEtapaProcesal(e.target.value)}
          />

          <input
            placeholder="Actuación pendiente"
            className="border p-3 rounded"
            value={actuacionPendiente}
            onChange={(e) => setActuacionPendiente(e.target.value)}
          />

          <button
            onClick={handleSave}
            className="col-span-2 bg-[#14834a] text-white py-3 rounded-lg hover:bg-[#106b3c]"
          >
            {editando ? "Actualizar proceso" : "Crear proceso"}
          </button>
        </div>

        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full min-w-[1450px] text-left">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-3 whitespace-nowrap">Radicado</th>
                <th className="p-3 whitespace-nowrap">Juzgado</th>
                <th className="p-3 whitespace-nowrap">Demandante</th>
                <th className="p-3 whitespace-nowrap">Demandado</th>
                <th className="p-3 whitespace-nowrap">Etapa procesal</th>
                <th className="p-3 whitespace-nowrap">Actuación pendiente</th>
                <th className="p-3 whitespace-nowrap">Estado</th>
                <th className="p-3 whitespace-nowrap">Días hábiles</th>
                <th className="p-3 whitespace-nowrap">Fecha vencimiento</th>
                <th className="p-3 whitespace-nowrap">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {procesos.length === 0 ? (
                <tr>
                  <td colSpan="10" className="p-4 text-center text-slate-500">
                    No hay procesos registrados
                  </td>
                </tr>
              ) : (
                procesos.map((p) => (
                  <tr key={p._id} className="border-t align-top">
                    <td className="p-3 whitespace-nowrap">{p.radicado}</td>

                    <td className="p-3 max-w-[180px] whitespace-normal break-words">
                      {p.juzgado}
                    </td>

                    <td className="p-3 max-w-[180px] whitespace-normal break-words">
                      {p.demandante}
                    </td>

                    <td className="p-3 max-w-[180px] whitespace-normal break-words">
                      {p.demandado}
                    </td>

                    <td className="p-3 max-w-[180px] whitespace-normal break-words">
                      {p.etapaProcesal || "—"}
                    </td>

                    <td className="p-3 max-w-[220px] whitespace-normal break-words">
                      {p.actuacionPendiente || "—"}
                    </td>

                    <td className="p-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          p.estado === "En curso"
                            ? "bg-blue-100 text-blue-700"
                            : p.estado === "Finalizado"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {p.estado}
                      </span>
                    </td>

                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="1"
                          className="w-20 border rounded px-2 py-1"
                          value={diasPorProceso[p._id] || ""}
                          onChange={(e) =>
                            setDiasPorProceso((prev) => ({
                              ...prev,
                              [p._id]: e.target.value
                            }))
                          }
                        />

                        <button
                          onClick={() => handleCalcular(p)}
                          className="px-3 py-1 rounded-md bg-green-100 text-green-700 hover:bg-green-200 font-medium text-sm transition"
                        >
                          Calcular
                        </button>
                      </div>
                    </td>

                    <td className="p-3 whitespace-nowrap">
                      {vencimientos[p._id]
                        ? new Date(vencimientos[p._id]).toLocaleDateString()
                        : "—"}
                    </td>

                    <td className="p-3 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(p)}
                          className="px-3 py-1 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 font-medium text-sm transition"
                        >
                          Editar
                        </button>

                        <button
                          onClick={() => handleDelete(p._id)}
                          className="px-3 py-1 rounded-md bg-red-100 text-red-700 hover:bg-red-200 font-medium text-sm transition"
                        >
                          Eliminar
                        </button>
                      </div>
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

export default Dashboard;