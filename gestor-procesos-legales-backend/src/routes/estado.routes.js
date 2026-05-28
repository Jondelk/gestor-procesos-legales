const express = require("express");
const multer = require("multer");
const router = express.Router();

const {
  analizarEstadoPDF,
  obtenerActuaciones
} = require("../controllers/estado.controller");

const { protect } = require("../middlewares/auth.middleware");

const upload = multer({
  dest: "uploads/"
});

router.post("/analizar-pdf", protect, upload.single("pdf"), analizarEstadoPDF);

router.get("/actuaciones", protect, obtenerActuaciones);

module.exports = router;