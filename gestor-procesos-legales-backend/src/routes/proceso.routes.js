const express = require("express");
const router = express.Router();

const {
  crearProceso,
  obtenerProcesos,
  obtenerProcesoPorId,
  buscarPorRadicado,
  filtrarPorEstado,
  actualizarProceso,
  eliminarProceso,
  obtenerProcesosPendientes
} = require("../controllers/proceso.controller");

const { protect } = require("../middlewares/auth.middleware");

router.post("/", protect, crearProceso);
router.get("/", protect, obtenerProcesos);

// ✅ IMPORTANTE: antes de "/:id"
router.get("/pendientes", protect, obtenerProcesosPendientes);
router.get("/radicado/:radicado", protect, buscarPorRadicado);
router.get("/estado/:estado", protect, filtrarPorEstado);

router.get("/:id", protect, obtenerProcesoPorId);
router.put("/:id", protect, actualizarProceso);
router.delete("/:id", protect, eliminarProceso);

module.exports = router;