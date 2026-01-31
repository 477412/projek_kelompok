const { findUserById } = require("../../user/service.js");
const { resFailed } = require("../helpers/payload.js");

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

module.exports = { cekId, cekTambah, cekUpdate };
