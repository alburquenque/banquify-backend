const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  puntosAcumulados: {
    type: Number,
    default: 0,
  },
  cuentaVista: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CuentaVista",
  },
});

module.exports = mongoose.model("Usuario", UsuarioSchema);
