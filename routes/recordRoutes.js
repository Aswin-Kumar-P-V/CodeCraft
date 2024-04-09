const express = require("express");
const { saveRecord } = require("../controllers/recordController");

const router = express.Router();

router.post('/save-record', saveRecord);

module.exports = router;
