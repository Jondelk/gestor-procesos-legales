const mongoose = require('mongoose');

const procesoSchema = new mongoose.Schema(
  {
    radicado: {
      type: String,
      required: true,
      trim: true
    },
    juzgado: {
      type: String,
      required: true,
      trim: true
    },
    demandante: {
      type: String,
      required: true,
      trim: true
    },
    demandado: {
      type: String,
      required: true,
      trim: true
    },
    estado: {
      type: String,
      enum: ['Pendiente', 'En curso', 'Finalizado'],
      default: 'Pendiente'
    },
    etapaProcesal: {
    type: String,
    trim: true,
    default: ""
    },
    actuacionPendiente: {
    type: String,
    trim: true,
    default: ""
    },
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Proceso', procesoSchema);