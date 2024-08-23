const express = require("express");
const mongoose = require("mongoose");
const usuarioRoutes = require("./rutas/usuario.routes");
const transaccionRoutes = require("./rutas/transaccion.routes");
const cuentaVistaRoutes = require("./rutas/cuentaVista.routes");

require("dotenv").config();

const app = express();

mongoose.connect(process.env.MONGODB_URI);

app.use(express.json());

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/transacciones", transaccionRoutes);
app.use("/api/cuentasVista", cuentaVistaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
