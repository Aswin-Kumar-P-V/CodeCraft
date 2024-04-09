const express = require('express');
const router = express.Router();
const Record = require('../models/recordModle')

exports.saveRecord = async (req, res, next) => {
    try {
      const { Userprompt, GeneratedResult, userEmail } = req.body;
  
      const newRecord = new Record({
        Userprompt,
        GeneratedResult,
        Favorite: false,
        userEmail
      });
  
      await newRecord.save();
      res.status(200).json({ message: 'Record saved!' });
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
