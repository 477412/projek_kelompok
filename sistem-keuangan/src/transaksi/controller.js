const { resFailed, resSuccess } = require("../shared/helpers/payload");
const {
  findAllTransaksi,
  findTransaksiById,
  addTransaksi,
  updateTransaksi,
} = require("./service.js");

const path = require("path");
const fs = require("fs");

const getAllTransaksi = async (req, res) => {
  try {
    const data = await findAllTransaksi();
    return resSuccess(res, 200, "success", "Data transaksi koperasi", data);
  } catch (error) {
    return resFailed(res, 500, "error", error.message);
  }
};

const getTransaksiById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await findTransaksiById(id);
    return resSuccess(
      res,
      200,
      "success",
      "Data Transaksi berdasarkan id " + id,
      data,
    );
  } catch (error) {
    return resFailed(res, 500, "error", error.message);
  }
};

const createTransaksi = async (req, res) => {
  try {
    const { userId, nominal, status, tgl, keterangan } = req.body;

    let bukti_transaksi = null;
    if (req.file) {
      bukti_transaksi = path.basename(req.file.path);
    }
    const body = { userId, nominal, status, bukti_transaksi, tgl, keterangan };
    const data = await addTransaksi(body);
    return resSuccess(res, 201, "success", "Transaksi berhasil", data);
  } catch (error) {
    return resFailed(res, 500, "error", error.message);
  }
};

const removeTransaksi = async (req, res) => {
  try {
    const id = req.params.id;
    const findData = await findTransaksiById(id);
    const photos = findData.dataValues.bukti_transaksi;

    const filePath = path.join(process.cwd(), "src", "upload", photos);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return resSuccess(res, 200, "success", "Data dihapus");
  } catch (error) {
    return resFailed(res, 500, "error", error.message);
  }
};

const changeDataTransaksi = async (req, res) => {
  try {
    const id = req.params.id;
    const { userId, nominal, status, tgl, keterangan } = req.body;
    const findData = await findTransaksiById(id);
    const photos = findData.dataValues.bukti_transaksi;

    const filePath = path.join(process.cwd(), "src", "upload", photos);

    let bukti_transaksi = null;
    if (req.file) {
      bukti_transaksi = path.basename(req.file.path);
    }

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    const body = { userId, nominal, status, bukti_transaksi, tgl, keterangan };
    const data = await updateTransaksi(id, body);
    return resSuccess(res, 200, "success", "Data transaksi diupdate", data);
  } catch (error) {
    return resFailed(res, 500, "error", error.message);
  }
};

module.exports = {
  getAllTransaksi,
  getTransaksiById,
  createTransaksi,
  removeTransaksi,
  changeDataTransaksi,
};
