const {
  findUserById,
  findByRole,
  sortByNama,
} = require("../../user/service.js");
const { resFailed } = require("../helpers/payload.js");
const db = require("../../db/models");
const { where } = require("sequelize");
const { User } = db;

const cekId = async (req, res, next) => {
  const id = req.params.id;
  const data = await findUserById(id);

  if (data === null) {
    return resFailed(res, 500, "error", "Data tidak ditemukan");
  }
  next();
};

const cekTambah = async (req, res, next) => {
  const { role, nama, password, email } = req.body;
  if (role === "" || nama === "" || password === "" || email === "") {
    return resFailed(res, 500, "error", "Mohon isi Role,Nama,Password,Email");
  }

  const emailUnik = await User.findOne({ where: { email } });

  if (emailUnik) {
    return resFailed(res, 500, "error", "Email sudah terdaftar");
  }

  next();
};

const cekUpdate = async (req, res, next) => {
  const id = req.params.id;
  const data = await findUserById(id);
  const { role, nama, password, email } = req.body;

  if (data === null) {
    return resFailed(res, 500, "error", "Data tidak ditemukan");
  }
  if (role === "" || nama === "" || password === "" || email === "") {
    return resFailed(res, 500, "error", "Mohon isi Role,Nama,Password,Email");
  }
  next();
};

const cekRole = async (req, res, next) => {
  const { role } = req.query;
  const data = await findByRole(role);

  if (data.length === 0) {
    return resFailed(res, 500, "error", "Data tidak ditemukan");
  }
  if (!role) {
    return resFailed(res, 500, "error", "Query Wajib di isi");
  }
  next();
};

const cekSort = async (req, res, next) => {
  const { order } = req.query;
  const sort = ["asc", "desc"];

  if (!order) {
    return resFailed(res, 500, "error", "Query Wajib di isi");
  }
  if (!sort.includes(order.toLowerCase())) {
    return resFailed(res, 500, "error", "Query Wajib di isi dengan ASC DESC");
  }
  next();
};

module.exports = { cekId, cekTambah, cekUpdate, cekRole, cekSort };
