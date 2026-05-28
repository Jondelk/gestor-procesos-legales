const mongoose = require("mongoose");

const actuacionSchema = new mongoose.Schema(
  {
    proceso: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Proceso"
    },

    radicado: String,

    descripcion: String,

    fuente: String,

    fechaDeteccion: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Actuacion", actuacionSchema);