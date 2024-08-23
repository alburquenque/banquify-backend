const express = require("express");
const router = express.Router();
const cuentaVistaController = require("../controladores/cuentaVista.controller");

router.post("/", cuentaVistaController.crearCuentaVista);
router.get("/:id", cuentaVistaController.obtenerCuentaVista);
router.get("/", cuentaVistaController.obtenerCuentasVista);
router.put("/:id", cuentaVistaController.modificarCuentaVista);
router.delete("/:id", cuentaVistaController.eliminarCuentaVista);

module.exports = router;
