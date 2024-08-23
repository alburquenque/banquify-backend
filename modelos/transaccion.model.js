const mongoose = require("mongoose");

const TransaccionSchema = new mongoose.Schema({
  monto: {
    type: Number,
    required: true,
  },
  tipo: {
    type: String,
    enum: ["deposito", "retiro", "transferencia"],
    required: true,
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
  emisor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CuentaVista",
  },
  receptor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CuentaVista",
  },
});

module.exports = mongoose.model("Transaccion", TransaccionSchema);
