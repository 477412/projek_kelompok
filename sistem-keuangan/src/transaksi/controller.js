const { resFailed, resSuccess } = require("../shared/helpers/payload");
const {
  findAllTransaksi,
  findTransaksiById,
  addTransaksi,
  updateTransaksi,
  sortingTransaksi,
  searchTransaksiByStatus,
  findAllTransaksiPengeluaran,
  findAllTransaksiPemasukan,
  deleteTransaksi,
  searchTransaksiByUserId,
  searchTransaksiByUserIdPengeluaran,
} = require("./service.js");

const path = require("path");
const fs = require("fs");
const {
  cekQuerySearchByStatus,
} = require("../shared/middlewares/valTransaksi.js");
const { findUserById } = require("../user/service.js");

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

const removeTransaksi = async (req, res) => {
  try {
    const id = req.params.id;
    const findData = await findTransaksiById(id);
    const photos = findData.dataValues.bukti_transaksi;

    const filePath = path.join(process.cwd(), "src", "upload", photos);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    const data = await deleteTransaksi(id);
    return resSuccess(res, 200, "success", "Data dihapus");
  } catch (error) {
    return resFailed(res, 500, "error", error.message);
  }
};

const changeDataTransaksi = async (req, res) => {
  try {
    const id = req.params.id;
    const { nominal, status, tgl, keterangan } = req.body;
    const findData = await findTransaksiById(id);
    const photos = findData.dataValues.bukti_transaksi;
    const userId = req.user.id;

    const filePath = path.join(process.cwd(), "src", "upload", photos);

    let bukti_transaksi = null;
    if (req.file) {
      bukti_transaksi = path.basename(req.file.path);
    }
    console.log(bukti_transaksi);

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

const nominalAllTransaksi = async (req, res) => {
  try {
    const keluar = await findAllTransaksiPengeluaran();
    const masuk = await findAllTransaksiPemasukan();
    const totalDanaMasuk = masuk.map((n) => n.nominal);
    const totalDanaKeluar = keluar.map((n) => n.nominal);
    const totalMasuk = totalDanaMasuk.reduce((acc, curr) => acc + curr, 0);
    const totalKeluar = totalDanaKeluar.reduce((acc, curr) => acc + curr, 0);
    const total = totalMasuk - totalKeluar;
    return resSuccess(
      res,
      200,
      "success",
      "Total dana koperasi saat ini",
      total,
    );
  } catch (error) {
    return resFailed(res, 500, "error", error.message);
  }
};

const sortTransaksiByDate = async (req, res) => {
  try {
    const { sortBy } = req.query;
    const lowering = sortBy.toLowerCase();
    let kondisi = "";
    if (lowering === "asc") {
      kondisi = "Terlama";
    } else if (lowering === "desc") {
      kondisi = "Terbaru";
    }
    const data = await sortingTransaksi(lowering);
    return resSuccess(
      res,
      200,
      "error",
      `Data transaksi dari data ${kondisi}`,
      data,
    );
  } catch (error) {
    return resFailed(res, 500, "error", error.message);
  }
};

const filterTransaksiByStatus = async (req, res) => {
  try {
    const { status } = req.query;
    const lowering = status.toLowerCase();
    const data = await searchTransaksiByStatus(lowering);
    return resSuccess(res, 200, "success", `Data ${lowering} transaksi`, data);
  } catch (error) {
    return resFailed(res, 500, "error", error.message);
  }
};

const createTransaksiAnggota = async (req, res) => {
  try {
    const { nominal, tgl, keterangan } = req.body;
    const userId = req.user.id;

    let bukti_transaksi = null;
    if (req.file) {
      bukti_transaksi = path.basename(req.file.path);
    }

    const body = {
      userId,
      nominal,
      status: "pemasukan",
      bukti_transaksi,
      tgl,
      keterangan,
    };
    const data = await addTransaksi(body);
    return resSuccess(res, 201, "success", "Transaksi berhasil", data);
  } catch (error) {
    return resFailed(res, 500, "error", error.message);
  }
};

const withdrawMoney = async (req, res) => {
  try {
    const nominal = parseInt(req.body.nominal);
    const { tgl, keterangan } = req.body;
    const userId = req.user.id;

    let bukti_transaksi = null;
    if (req.file) {
      bukti_transaksi = path.basename(req.file.path);
    }
    const currTransaksi = {
      userId,
      nominal,
      status: "pengeluaran",
      bukti_transaksi,
      tgl,
      keterangan,
    };
    const data = await addTransaksi(currTransaksi);
    return resSuccess(
      res,
      200,
      "success",
      `Berhasil withdraw sebesar ${nominal}`,
      data,
    );
  } catch (error) {
    return resFailed(res, 500, "error", error.message);
  }
};

const showDataPengeluaran = async (req, res) => {
  try {
    const keluar = await findAllTransaksiPengeluaran();
    const totalDanaKeluar = keluar.map((n) => n.nominal);
    const totalKeluar = totalDanaKeluar.reduce((acc, curr) => acc + curr, 0);
    return resSuccess(
      res,
      200,
      "success",
      "Total pengeluaran bulan ini adalah Rp",
      totalKeluar,
    );
  } catch (error) {
    return resFailed(res, 500, "error", error.message);
  }
};

const showDataPemasukan = async (req, res) => {
  try {
    const masuk = await findAllTransaksiPemasukan();
    const totalDanaMasuk = masuk.map((n) => n.nominal);
    const totalMasuk = totalDanaMasuk.reduce((acc, curr) => acc + curr, 0);
    return resSuccess(
      res,
      200,
      "success",
      "Total pemasukan bulan ini",
      totalMasuk,
    );
  } catch (error) {
    return resFailed(res, 500, "error", error.message);
  }
};

const infoDepositById = async (req, res) => {
  try {
    const id = req.params.id;
    const filterTransaksimasuk = await searchTransaksiByUserId(id);
    const filterTransaksikeluar = await searchTransaksiByUserIdPengeluaran(id);
    const danaTransaksiMasuk = filterTransaksimasuk.map(
      (trans) => trans.nominal,
    );
    const danaTransaksiKeluar = filterTransaksikeluar.map(
      (trans) => trans.nominal,
    );
    const masuk = danaTransaksiMasuk.reduce((acc, curr) => acc + curr, 0);
    const keluar = danaTransaksiKeluar.reduce((acc, curr) => acc + curr, 0);

    const filterTransaksi = await searchTransaksiByUserId(id);

    const totalDanaUser = masuk - keluar;
    return resSuccess(
      res,
      200,
      "success",
      "Data riwayat transaksi user dengan id " + id,
      {
        nominal: totalDanaUser,
        riwayat_transaksi: filterTransaksi,
      },
    );
  } catch (error) {
    return resFailed(res, 500, "error", error.message);
  }
};

module.exports = {
  getAllTransaksi,
  getTransaksiById,
  removeTransaksi,
  changeDataTransaksi,
  nominalAllTransaksi,
  sortTransaksiByDate,
  filterTransaksiByStatus,
  createTransaksiAnggota,
  withdrawMoney,
  showDataPemasukan,
  showDataPengeluaran,
  infoDepositById,
};
