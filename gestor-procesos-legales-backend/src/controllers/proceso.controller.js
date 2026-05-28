const Proceso = require('../models/Proceso');


// =============================
// Crear proceso
// =============================
const crearProceso = async (req, res) => {
  try {

    const {
  radicado,
  juzgado,
  demandante,
  demandado,
  estado,
  etapaProcesal,
  actuacionPendiente
  } = req.body;

    if (!radicado || !juzgado || !demandante || !demandado) {
      return res.status(400).json({
        message: 'Todos los campos obligatorios deben ser enviados'
      });
    }

    const proceso = await Proceso.create({
      radicado,
      juzgado,
      demandante,
      demandado,
      estado,
      etapaProcesal,
      actuacionPendiente,
      usuario: req.user._id
    });

    return res.status(201).json({
      message: "Proceso creado correctamente",
      proceso
    });

  } catch (error) {

    return res.status(500).json({
      message: 'Error al crear proceso',
      error: error.message
    });

  }
};


// =============================
// Obtener todos los procesos
// =============================
const obtenerProcesos = async (req, res) => {
  try {

    const procesos = await Proceso.find({
      usuario: req.user._id
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      total: procesos.length,
      procesos
    });

  } catch (error) {

    return res.status(500).json({
      message: 'Error al obtener procesos',
      error: error.message
    });

  }
};


// =============================
// Obtener proceso por ID
// =============================
const obtenerProcesoPorId = async (req, res) => {
  try {

    const proceso = await Proceso.findOne({
      _id: req.params.id,
      usuario: req.user._id
    });

    if (!proceso) {
      return res.status(404).json({
        message: 'Proceso no encontrado'
      });
    }

    return res.status(200).json(proceso);

  } catch (error) {

    return res.status(500).json({
      message: 'Error al obtener proceso',
      error: error.message
    });

  }
};

const obtenerProcesosPendientes = async (req, res) => {
  try {
    const procesos = await Proceso.find({
    usuario: req.user._id,
    estado: { $in: ["Pendiente", "En curso"] }
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      total: procesos.length,
      procesos
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener procesos pendientes",
      error: error.message
    });
  }
};

// =============================
// Buscar proceso por radicado
// =============================
const buscarPorRadicado = async (req, res) => {
  try {

    const { radicado } = req.params;

    const proceso = await Proceso.findOne({
      radicado,
      usuario: req.user._id
    });

    if (!proceso) {
      return res.status(404).json({
        message: "Proceso no encontrado"
      });
    }

    return res.status(200).json({
      message: "Proceso encontrado",
      proceso
    });

  } catch (error) {

    return res.status(500).json({
      message: "Error al buscar proceso",
      error: error.message
    });

  }
};


// =============================
// Filtrar procesos por estado
// =============================
const filtrarPorEstado = async (req, res) => {
  try {

    const { estado } = req.params;

    const procesos = await Proceso.find({
      estado,
      usuario: req.user._id
    });

    return res.status(200).json({
      total: procesos.length,
      procesos
    });

  } catch (error) {

    return res.status(500).json({
      message: "Error al filtrar procesos",
      error: error.message
    });

  }
};


// =============================
// Actualizar proceso
// =============================
const actualizarProceso = async (req, res) => {
  try {

    const proceso = await Proceso.findOne({
      _id: req.params.id,
      usuario: req.user._id
    });

    if (!proceso) {
      return res.status(404).json({
        message: 'Proceso no encontrado'
      });
    }

    proceso.radicado = req.body.radicado || proceso.radicado;
    proceso.juzgado = req.body.juzgado || proceso.juzgado;
    proceso.demandante = req.body.demandante || proceso.demandante;
    proceso.demandado = req.body.demandado || proceso.demandado;
    proceso.estado = req.body.estado || proceso.estado;
    proceso.etapaProcesal = req.body.etapaProcesal || proceso.etapaProcesal;
    proceso.actuacionPendiente = req.body.actuacionPendiente || proceso.actuacionPendiente;

    const procesoActualizado = await proceso.save();

    return res.status(200).json({
      message: "Proceso actualizado correctamente",
      proceso: procesoActualizado
    });

  } catch (error) {

    return res.status(500).json({
      message: 'Error al actualizar proceso',
      error: error.message
    });

  }
};


// =============================
// Eliminar proceso
// =============================
const eliminarProceso = async (req, res) => {
  try {

    const proceso = await Proceso.findOne({
      _id: req.params.id,
      usuario: req.user._id
    });

    if (!proceso) {
      return res.status(404).json({
        message: 'Proceso no encontrado'
      });
    }

    await proceso.deleteOne();

    return res.status(200).json({
      message: 'Proceso eliminado correctamente'
    });

  } catch (error) {

    return res.status(500).json({
      message: 'Error al eliminar proceso',
      error: error.message
    });

  }
};


module.exports = {
  crearProceso,
  obtenerProcesos,
  obtenerProcesoPorId,
  buscarPorRadicado,
  filtrarPorEstado,
  actualizarProceso,
  eliminarProceso,
  obtenerProcesosPendientes
};