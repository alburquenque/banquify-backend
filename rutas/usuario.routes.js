const express = require("express");
const router = express.Router();
const usuarioController = require("../controladores/usuario.controller");

router.post("/", usuarioController.crearUsuario);
router.get("/:id", usuarioController.obtenerUsuario);
router.get("/", usuarioController.obtenerUsuarios);
router.put("/:id", usuarioController.modificarUsuario);
router.delete("/:id", usuarioController.eliminarUsuario);
router.post("/:id/transferencia", usuarioController.realizarTransferencia);
router.post("/:id/abono", usuarioController.realizarAbono);
router.post("/:id/retiro", usuarioController.realizarRetiro);
router.get("/:id/transacciones", usuarioController.obtenerTransacciones);

module.exports = router;
