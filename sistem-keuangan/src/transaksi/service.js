const { where } = require("sequelize");
const db = require("../db/models");
const { Transaksi } = db;

const findAllTransaksi = async () => {
  return await Transaksi.findAll();
};

const findTransaksiById = async (id) => {
  return await Transaksi.findByPk(id);
};

const addTransaksi = async (body) => {
  return await Transaksi.create(body);
};

const deleteTransaksi = async (id) => {
  return await Transaksi.destroy({ where: { id } });
};

const updateTransaksi = async (id, body) => {
  const data = await Transaksi.findByPk(id);
  return data.update(body);
};
module.exports = {
  findAllTransaksi,
  findTransaksiById,
  addTransaksi,
  deleteTransaksi,
  updateTransaksi,
};
