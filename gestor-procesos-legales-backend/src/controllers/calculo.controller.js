const { addBusinessDays } = require("../utils/businessDays");

const calcularDiasHabiles = async (req, res) => {
  try {
    const { fechaInicio, diasHabiles } = req.body;

    if (!fechaInicio || diasHabiles === undefined) {
      return res.status(400).json({
        message: "Fecha de inicio y días hábiles son obligatorios"
      });
    }

    const resultado = addBusinessDays(fechaInicio, Number(diasHabiles));

    return res.status(200).json({
      fechaInicio,
      diasHabiles: Number(diasHabiles),
      fechaVencimiento: resultado
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al calcular días hábiles",
      error: error.message
    });
  }
};

module.exports = {
  calcularDiasHabiles
};