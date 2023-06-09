const { UsersCheck } = require('../models');
require('dotenv').config();
const jwt = require('jsonwebtoken');


const loadfileController = {

  createUserCheck: async (req, res) => {
    try {

      const filesAdded = await UsersCheck.create(req.body);
      const allRegisters = await UsersCheck.find();

      res.status(200).json({ data: { filesAdded, isSuccessful: true, message: 'File data saved', allRegisters }, });
    } catch (error) {
      res.status(400).json({ error, data: { isSuccessful: false, message: 'Error to dave data' } })
    }
  },

  getAllChecks: async (req, res) => {
    try {

      const allRegisters = await UsersCheck.find();
      res.status(200).json({ allRegisters, isSuccessful: true, message: 'Files loaded' });
    } catch (error) {
      res.status(400).json({ error, data: { isSuccessful: false, message: 'Error to load rows' } })
    }
  },

  findAndUpdate: async (req, res) => {
    try {

      console.log(req.body)

      const registerUpdated = await UsersCheck.findOneAndUpdate(
        { _id: req.body._id },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      const updatedRegisters = await UsersCheck.find();

      res.status(200).json({ updatedRegisters, isSuccessful: true, message: 'Row updated' });
    } catch (error) {
      res.status(400).json({ error, data: { isSuccessful: false, message: 'Error to update' } })
    }
  },

  findAndDelete: async (req, res) => {
    try {

      const findRow = await UsersCheck.findOne({ _id: req.body._id });

      //Delete register
      const deleteRow = await UsersCheck.findOneAndDelete({ _id: findRow._id });


      res.status(200).json({deleteRow,  isSuccessful: true, message: 'Row deleted' });
    } catch (error) {
      res.status(400).json({ error, data: { isSuccessful: false, message: 'Error to load' } })
    }
  },


  verifyToken: async (req, res, next) => {
    try {

      //Get token from headers
      const token = req.headers.authorization;
      if (token) {
        // Check and decode token
        jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
          if (error) {
            //If not valid
            return res.status(200).json({ mensaje: 'Token not valid' });

          } else {
            req.usuario = decoded;
            next();
          }
        });
      } else {
        // No token provided
        return res.status(200).json({ data: { message: 'Needs authentication, please log in', status: 404, isSuccessful: false, } });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
}

module.exports = loadfileController;