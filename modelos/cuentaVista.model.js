const mongoose = require("mongoose");

const CuentaVistaSchema = new mongoose.Schema({
  idUsuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
  },
  saldo: {
    type: Number,
    default: 0,
  },
  historialTransacciones: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaccion",
    },
  ],
  habilitada: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("CuentaVista", CuentaVistaSchema);
