
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  dni: String,
  nombres: String,
  apellidos: String,
  fechaNacimiento: Date,
  rol: String,
  telefono: String,
  correo: String,
  contrasena: String,
  nombreUsuario: String
});

module.exports = mongoose.model('User', userSchema);
