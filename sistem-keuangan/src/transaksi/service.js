const { where } = require("sequelize");
const db = require("../db/models");
const { Transaksi } = db;

const findAllTransaksi = async () => {
  return await Transaksi.findAll();
};

const findAllTransaksiPemasukan = async () => {
  return await Transaksi.findAll({
    where: { status: "pemasukan" },
  });
};
const findAllTransaksiPengeluaran = async () => {
  return await Transaksi.findAll({
    where: { status: "pengeluaran" },
  });
};

const findTransaksiById = async (id) => {
  const transaksiUser = await Transaksi.findOne({
    where: { id },
    include: [
      {
        association: "user",
        attributes: ["id", "nama", "email", "role"],
      },
    ],
  });
  return transaksiUser;
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

const sortingTransaksi = async (sortBy) => {
  return await Transaksi.findAll({
    order: [["tgl", sortBy]],
  });
};

const searchTransaksiByStatus = async (status) => {
  return await Transaksi.findAll({
    where: { status },
  });
};

module.exports = {
  findAllTransaksi,
  findTransaksiById,
  addTransaksi,
  deleteTransaksi,
  updateTransaksi,
  sortingTransaksi,
  searchTransaksiByStatus,
  findAllTransaksiPengeluaran,
  findAllTransaksiPemasukan,
};
