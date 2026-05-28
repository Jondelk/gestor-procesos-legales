const fs = require("fs");
const pdfParse = require("pdf-parse");
const Proceso = require("../models/Proceso");
const Actuacion = require("../models/Actuacion");

const analizarEstadoPDF = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Debe subir un archivo PDF"
      });
    }

    const buffer = fs.readFileSync(req.file.path);
    const data = await pdfParse(buffer);
    const textoPDF = data.text;

    const procesos = await Proceso.find({
      usuario: req.user._id
    });

    const cambiosDetectados = [];

    for (const proceso of procesos) {
      if (textoPDF.includes(proceso.radicado)) {
        const actuacionExistente = await Actuacion.findOne({
          proceso: proceso._id,
          radicado: proceso.radicado,
          descripcion: { $regex: proceso.radicado }
        });

        if (!actuacionExistente) {
          const nuevaActuacion = await Actuacion.create({
            proceso: proceso._id,
            radicado: proceso.radicado,
            descripcion: `El proceso con radicado ${proceso.radicado} apareció en el estado judicial cargado.`,
            fuente: req.file.originalname
          });

          proceso.estado = "En curso";
          await proceso.save();

          cambiosDetectados.push({
            proceso,
            actuacion: nuevaActuacion
          });
        }
      }
    }

    fs.unlinkSync(req.file.path);

    return res.status(200).json({
      message: "Análisis completado",
      totalCambios: cambiosDetectados.length,
      cambios: cambiosDetectados
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error al analizar PDF",
      error: error.message
    });
  }
};

const obtenerActuaciones = async (req, res) => {

  try {

    const actuaciones = await Actuacion.find()
      .populate("proceso")
      .sort({ createdAt: -1 });

    res.json(actuaciones);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

module.exports = {
  analizarEstadoPDF,
  obtenerActuaciones
};