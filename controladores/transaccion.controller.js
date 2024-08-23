const Transaccion = require("../modelos/transaccion.model");

exports.obtenerTransaccion = async (req, res) => {
  try {
    const transaccion = Transaccion.findById(req.params.id);
    if (!transaccion) {
      res.status(404).json({ mensaje: "Transacción no encontrada" });
    }
    res.status(200).json({ transaccion });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerTransacciones = async (req, res) => {
  try {
    const { tipo } = req.query;
    let query = { _id: { $in: usuario.cuentaVista.historialTransacciones } };
    if (tipo) {
      query.tipo = tipo;

      const transacciones = Transaccion.find(query);
      res.status(200).json({ transacciones });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
