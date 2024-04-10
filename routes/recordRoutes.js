const express = require("express");
const { saveRecord, updateRecord, getUserHistory, getUserFavorites } = require("../controllers/recordController");

const router = express.Router();

router.post('/save-record', saveRecord);
router.put('/update-record/:id', updateRecord);
router.get('/history/:userEmail', getUserHistory);
router.get('/favorites/:userEmail', getUserFavorites);

module.exports = router;