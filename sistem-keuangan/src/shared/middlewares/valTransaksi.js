const { findTransaksiById } = require("../../transaksi/service");
const db = require("../../db/models");
const { resFailed } = require("../helpers/payload");
const { Transaksi, User } = db;

const cekIdTransaksi = async (req, res, next) => {
  const id = req.params.id;

  if (isNaN(id)) {
    return resFailed(res, 404, "error", "Id harus berupa angka valid");
  }

  const cekId = await findTransaksiById(id);

  if (!cekId) {
    return resFailed(res, 404, "error", "Data tidak ditemukan");
  }

  next();
};

const cekBodyTransaksi = async (req, res, next) => {
  console.log(req.body);

  const { userId, nominal, status, tgl, keterangan } = req.body;

  const bukti_transaksi = req.file;
  if (!bukti_transaksi) {
    return resFailed(res, 500, "error", "mohon sertakan bukti transaksi");
  }

  if (!userId) {
    return resFailed(res, 500, "error", "userId tidak boleh kosong");
  }

  if (!nominal) {
    return resFailed(res, 500, "error", "nominal kosong, mohon isi nominal");
  }

  if (!status) {
    return resFailed(res, 500, "error", "status kosong");
  }

  if (!tgl) {
    return resFailed(res, 500, "error", "tanggal tidak boleh kosong");
  }

  if (!keterangan) {
    return resFailed(res, 500, "error", "mohon sertakan keterangan transaksi");
  }

  next();
};
module.exports = {
  cekIdTransaksi,
  cekBodyTransaksi,
};
