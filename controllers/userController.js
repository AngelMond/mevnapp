const { User } = require('../models');
require('dotenv').config();
const jwt = require('jsonwebtoken');


const userController = {


  //Method to create a new User
  signup: async (req, res) => {
    try {
      const createUser = await User.create(req.body);
      console.log(createUser)
      const userId = createUser._id;
      const username = createUser.username;


      // if (req.body.username === username) {
      //   const payload = { username: response.username }
      //   const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '24h' });


      //   req.session.save(() => {
      //     req.session.loggedIn = true;
      //     req.session.userId = userId;
      //     req.session.username = username;
      //     req.session.token = token;
      //     // res.status(200).redirect("/homepage");
      //   });
      // }
      res.status(200).json({ message: 'Signup successful', isSuccessful: true });

    } catch (err) {
      res.status(200).json({ err, data: { message: 'The user is already registered', isSuccessful: false } });
    }
  },

  //Method to login
  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      console.log(req.body)
      // Verify if user exists
      const response = await User.findOne({ username });
      console.log(response)

      // res.status(200).json(response)

      if (response === null) {
        return res.status(200).json({ data: { message: 'Username or password not valid', isSuccessful: false } });
      }

      // Verifica la contraseña utilizando el método comparePassword
      const isValidPassword = await response.comparePassword(password);

      if (!isValidPassword) {
        return res.status(200).json({ data: { message: 'Username or password not valid', isSuccessful: false } });
      }

      const userId = response._id;

      const payload = { username: response.username }
      const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '24h' });


      // req.session.save(() => {
      //   req.session.loggedIn = true;
      //   req.session.userId = userId;
      //   req.session.username = username;
      //   req.session.token = token;
      //   // res.status(200).redirect("/homepage");
      // });
      return res.status(200).json({
        data: {
          message: 'Login successful',
          isSuccessful: true,
          user: username,
          userId: userId,
          token: token,
        }
      });
    } catch (err) {
      return res.status(500).json({ message: 'error', isSuccessful: false, err });
    }
  },

  verifyToken: async (req, res, next) => {
    // Obtén el token de la cabecera 'Authorization'
    const token = req.headers.authorization;

    if (token) {
      // Verifica y decodifica el token
      jwt.verify(token, secretKey, (error, decoded) => {
        if (error) {
          // El token no es válido
          return res.status(401).json({ mensaje: 'Token inválido' });
        } else {
          // El token es válido, adjunta los datos decodificados a la solicitud
          req.usuario = decoded;
          next();
        }
      });
    } else {
      // No se proporcionó ningún token
      return res.status(401).json({ mensaje: 'Token no proporcionado' });
    }
  },
}

module.exports = userController;