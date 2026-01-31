const db = require("../db/models");
const { Transaksi } = db;

const findAllTransaksi = async () => {
  return await Transaksi.findAll();
};

module.exports = { findAllTransaksi };
