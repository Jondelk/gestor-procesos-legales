const express = require("express");
const router = express.Router();
const { calcularDiasHabiles } = require("../controllers/calculo.controller");
const { protect } = require("../middlewares/auth.middleware");

router.post("/dias-habiles", protect, calcularDiasHabiles);

module.exports = router;