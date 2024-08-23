const express = require("express");
const router = express.Router();
const transaccionController = require("../controladores/transaccion.controller");

router.get("/:id", transaccionController.obtenerTransaccion);
router.get("/", transaccionController.obtenerTransacciones);

module.exports = router;
