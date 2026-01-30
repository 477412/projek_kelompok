const express = require("express");
const { getAllTransaksi } = require("./controller");
const router = express.Router();

router.get("/", getAllTransaksi);
console.log(getAllTransaksi);

module.exports = router;
