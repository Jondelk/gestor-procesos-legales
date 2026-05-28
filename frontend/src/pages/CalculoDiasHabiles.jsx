import { useState } from "react";
import Navbar from "../components/Navbar";
import { calcularDiasHabiles } from "../services/calculoService";

function CalculoDiasHabiles() {
  const [fechaInicio, setFechaInicio] = useState("");
  const [diasHabiles, setDiasHabiles] = useState("");
  const [resultado, setResultado] = useState(null);

  const handleCalcular = async () => {
    try {
      const res = await calcularDiasHabiles({
        fechaInicio,
        diasHabiles
      });

      setResultado(res);
    } catch (error) {
      console.error("Error calculando:", error);
      setResultado(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-slate-800 mb-6">
          Cálculo de Días Hábiles
        </h1>

        <div className="bg-white rounded-xl shadow p-6 space-y-4">
          <div>
            <label className="block text-sm text-slate-600 mb-2">
              Fecha de inicio
            </label>
            <input
              type="date"
              className="w-full border p-3 rounded"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-2">
              Número de días hábiles
            </label>
            <input
              type="number"
              className="w-full border p-3 rounded"
              value={diasHabiles}
              onChange={(e) => setDiasHabiles(e.target.value)}
            />
          </div>

          <button
            onClick={handleCalcular}
            className="bg-[#14834a] text-white px-6 py-3 rounded-lg hover:bg-[#106b3c]"
          >
            Calcular
          </button>

          {resultado && (
            <div className="mt-6 p-4 rounded-lg bg-green-50 border border-green-200">
              <p className="text-slate-700">
                <strong>Fecha inicio:</strong> {resultado.fechaInicio}
              </p>
              <p className="text-slate-700">
                <strong>Días hábiles:</strong> {resultado.diasHabiles}
              </p>
              <p className="text-slate-700">
                <strong>Fecha de vencimiento:</strong>{" "}
                {new Date(resultado.fechaVencimiento).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default CalculoDiasHabiles;