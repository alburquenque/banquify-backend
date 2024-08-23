const Usuario = require("../modelos/usuario.model");
const CuentaVista = require("../modelos/cuentaVista.model");
const Transaccion = require("../modelos/transaccion.model");

//Creación, lectura, actualización y eliminación de usuarios
exports.crearUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.create(req.body);
    res.status(201).json({ usuario });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.obtenerUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
    res.status(200).json({ usuario });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerUsuarios = async (req, res) => {
  try {
    const { nombre } = req.query;
    const query = nombre ? { nombre: { $regex: nombre, $options: "i" } } : {};
    const usuarios = await Usuario.find(query);
    res.status(200).json({ usuarios });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.modificarUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await Usuario.findByIdAndUpdate(
      req.params.id,
      { email, password },
      { new: true }
    );
    if (!usuario) {
      res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
    res.status(200).json({ usuario });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.eliminarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) {
      res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
    res.status(200).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.realizarTransferencia = async (req, res) => {
  try {
    const { idReceptor, monto } = req.body;
    const { idEmisor } = req.params;

    const [emisor, receptor] = await Promise.all([
      Usuario.findById(idEmisor).populate("cuentaVista"),
      Usuario.findById(idReceptor).populate("cuentaVista"),
    ]);

    if (!emisor?.cuentaVista || !receptor?.cuentaVista) {
      res.status(400).json({ mensaje: "No se ha encontrado una cuenta vista" });
    }

    if (emisor.cuentaVista.saldo < monto) {
      res.status(400).json({ mensaje: "Saldo insuficiente" });
    }

    emisor.cuentaVista.saldo -= monto;
    receptor.cuentaVista.saldo += monto;
    puntosAcumulados += 5;

    await Promise.all([
      emisor.save(),
      receptor.save(),
      emisor.cuentaVista.save(),
      receptor.cuentaVista.save(),
      transaccion.save(),
    ]);
    res.status(200).json({ mensaje: "Transferencia realizada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.realizarAbono = async (req, res) => {
  try {
    const { monto } = req.body;
    const usuario = await Usuario.findById(req.params.id).populate(
      "cuentaVista"
    );
    if (!usuario?.cuentaVista) {
      res.status(400).json({ mensaje: "No se ha encontrado una cuenta vista" });
    }
    usuario.cuentaVista.saldo += monto;

    const transaccion = new Transaccion({
      monto,
      tipo: "deposito",
      emisor: usuario.cuentaVista._id,
      receptor: usuario.cuentaVista._id,
    });

    usuario.cuentaVista.historialTransacciones.push(transaccion._id);

    await Promise.all([usuario.cuentaVista.save(), transaccion.save()]);

    res.status(200).json({ mensaje: "Abono realizado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.realizarRetiro = async (req, res) => {
  try {
    const { monto } = req.body;
    const usuario = await Usuario.findById(req.params.id).populate(
      "cuentaVista"
    );
    if (!usuario?.cuentaVista) {
      res.status(400).json({ mensaje: "No se ha encontrado una cuenta vista" });
    }
    if (usuario.cuentaVista.saldo < monto) {
      res.status(400).json({ mensaje: "Saldo insuficiente" });
    }

    usuario.cuentaVista.saldo -= monto;

    const transaccion = new Transaccion({
      monto,
      tipo: "retiro",
      emisor: usuario.cuentaVista._id,
      receptor: usuario.cuentaVista._id,
    });

    usuario.cuentaVista.historialTransacciones.push(transaccion._id);

    await Promise.all([usuario.cuentaVista.save(), transaccion.save()]);

    res.status(200).json({ mensaje: "Retiro realizado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerTransacciones = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id).populate(
      "cuentaVista"
    );
    if (!usuario?.cuentaVista) {
      res.status(400).json({ mensaje: "No se ha encontrado una cuenta vista" });
    }

    const { tipo } = req.query;

    const query = {
      _id: { $in: usuario.cuentaVista.historialTransacciones },
      ...(tipo && { tipo }),
    };

    const transacciones = await Transaccion.find(query);
    res.status(200).json({ transacciones });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
