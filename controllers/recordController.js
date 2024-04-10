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
  
      const savedRecord = await newRecord.save();
      res.status(200).json({ message: 'Record saved!', id: savedRecord._id });
    } catch (err) {
      console.log(err);
      next(err);
    }
};
exports.updateRecord = async (req, res, next) => {
    try {
      const { isFavorite } = req.body;
      const { id } = req.params;
  
      const updatedRecord = await Record.findByIdAndUpdate(id, { Favorite: isFavorite }, { new: true });
  
      if (!updatedRecord) {
        return res.status(404).json({ message: 'Record not found!' });
      }
  
      res.status(200).json({ message: 'Record updated!', id: updatedRecord._id, isFavorite: updatedRecord.Favorite });
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

  exports.getUserHistory = async (req, res, next) => {
    try {
      const { userEmail } = req.params;
      const userHistory = await Record.find({ userEmail: userEmail });
      res.status(200).json(userHistory);
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
  
  exports.getUserFavorites = async (req, res, next) => {
    try {
      const { userEmail } = req.params;
      const userFavorites = await Record.find({ userEmail: userEmail, Favorite: true });
      res.status(200).json(userFavorites);
    } catch (err) {
      console.log(err);
      next(err);
    }
  };