const { User } = require('../models');
require('dotenv').config();
const jwt = require('jsonwebtoken');


const homepageController = {

    verifyToken: async (req, res, next) => {
        //Get token from headers
        const token = req.headers.authorization;
      
        if (token) {
          // Check and decode token
          jwt.verify(token, secretKey, (error, decoded) => {
            if (error) {
              //If not valid
              return res.status(401).json({ mensaje: 'Token valid' });

            } else {
              req.usuario = decoded;
              next();
              
            }
          });
        } else {
          // No token provided
          return res.status(401).json({ mensaje: 'Token no valid' });
        }
      },
}

module.exports = homepageController;