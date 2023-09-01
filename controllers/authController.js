
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/user');

exports.signup = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.contrasenia, 10);
    const newUser = await User.create({
      ...req.body,
      contrasena: hashedPassword,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ nombreUsuario: req.body.nombreUsuario });
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const passwordMatch = await bcrypt.compare(
      req.body.contrasena,
      user.contrasena
    );
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ id: user._id }, config.secretKey, {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error en la autenticación' });
  }
};
