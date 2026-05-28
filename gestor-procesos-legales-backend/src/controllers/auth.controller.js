const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// REGISTER
const register = async (req, res) => {

  try {

    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({
        message: "Todos los campos son obligatorios"
      });
    }

    const user = await User.create({
      nombre,
      email,
      password
    });

    res.status(201).json({
      message: "Usuario registrado",
      token: generateToken(user._id)
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// LOGIN
const login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Credenciales inválidas"
      });
    }

    res.json({
      message: "Login exitoso",
      token: generateToken(user._id)
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// PROFILE
const profile = async (req, res) => {

  res.json({
    message: "Perfil del usuario",
    user: req.user
  });

};


// EXPORTAR AL FINAL
module.exports = {
  register,
  login,
  profile
};