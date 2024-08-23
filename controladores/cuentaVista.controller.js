const CuentaVista = require("../modelos/cuentaVista.model");
const Usuario = require("../modelos/usuario.model");

exports.crearCuentaVista = async (req, res) => {
  try {
    const { idUsuario, habilitada = true } = req.body;
    const usuario = await Usuario.findById(idUsuario);
    if (!usuario) {
      res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
    const cuentaVista = await CuentaVista.create({ idUsuario, habilitada });
    usuario.cuentaVista = cuentaVista._id;
    await usuario.save();

    res.status(201).json({ cuentaVista });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.obtenerCuentaVista = async (req, res) => {
  try {
    const cuentaVista = await CuentaVista.findById(req.params.id);

    if (!cuentaVista) {
      res.status(404).json({ mensaje: "Cuenta Vista no encontrada" });
    }

    res.status(200).json({ cuentaVista });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerCuentasVista = async (req, res) => {
  try {
    const { habilitada } = req.query;
    const query =
      habilitada !== undefined ? { habilitada: habilitada === "true" } : {};
    const cuentasVistas = await CuentaVista.find(query);
    res.status(200).json({ cuentasVistas });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.modificarCuentaVista = async (req, res) => {
  try {
    const { habilitada } = req.body;
    const cuentaVista = await CuentaVista.findByIdAndUpdate(
      req.params.id,
      { habilitada },
      { new: true }
    );
    if (!cuentaVista) {
      res.status(404).json({ mensaje: "Cuenta Vista no encontrada" });
    }
    res.status(200).json({ cuentaVista });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.eliminarCuentaVista = async (req, res) => {
  try {
    const cuentaVista = await CuentaVista.findByIdAndDelete(req.params.id);
    if (!cuentaVista) {
      res.status(404).json({ mensaje: "Cuenta Vista no encontrada" });
    }

    await Usuario.findByIdAndUpdate(cuentaVista.idUsuario, {
      $unset: { cuentaVista: 1 },
    });

    res.status(200).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
