const {
  findTransaksiById,
  findAllTransaksiPengeluaran,
  findAllTransaksiPemasukan,
  searchTransaksiByUserIdPemasukan,
} = require("../../transaksi/service");
const db = require("../../db/models");
const { resFailed } = require("../helpers/payload");
const { findUserById, findAllUser } = require("../../user/service");
const User = db;

const cekIdTransaksi = async (req, res, next) => {
  const id = req.params.id;

  if (isNaN(id)) {
    return resFailed(res, 404, "error", "Id harus berupa angka valid");
  }

  const cekId = await findTransaksiById(id);
  console.log(cekId);

  if (!cekId) {
    return resFailed(
      res,
      404,
      "error",
      "Data dengan id " + id + " tidak ditemukan",
    );
  }

  next();
};

const cekBodyTransaksi = async (req, res, next) => {
  const id = req.params.id;
  const { userId, nominal, status, tgl, keterangan } = req.body;
  const findUserId = await findAllUser();
  const carii = findUserId.find((data) => data.id === userId);
  if (!carii) {
    return resFailed(res, 404, "error", "Userid tidak valid");
  }
  const findData = await findTransaksiById(id);

  let bukti_transaksi = req.file;

  if (!bukti_transaksi) {
    bukti_transaksi = findData.bukti_transaksi;
  }
  if (!status) {
    return resFailed(res, 500, "error", "status tidak boleh kosong");
  }
  if (!userId) {
    return resFailed(res, 500, "error", "userId tidak boleh kosong");
  }

  if (!nominal) {
    return resFailed(res, 500, "error", "nominal kosong, mohon isi nominal");
  }

  if (!tgl) {
    return resFailed(res, 500, "error", "tanggal tidak boleh kosong");
  }

  if (!keterangan) {
    return resFailed(res, 500, "error", "mohon sertakan keterangan transaksi");
  }

  next();
};

const cekQuerySort = async (req, res, next) => {
  const { sortBy } = req.query;
  const lowering = sortBy.toLowerCase();
  if (lowering !== "asc" && lowering !== "desc") {
    return resFailed(res, 400, "error", "query tidak valid");
  }
  next();
};

const cekQuerySearchByStatus = async (req, res, next) => {
  const { status } = req.query;
  const lowering = status.toLowerCase();
  console.log(lowering);

  if (lowering !== "pemasukan" && lowering !== "pengeluaran") {
    return resFailed(res, 400, "error", "Status tidak valid");
  }
  if (!lowering) {
    return resFailed(res, 400, "error", "Harap isi status");
  }
  next();
};

const cekWithdraw = async (req, res, next) => {
  const { nominal, tgl, keterangan } = req.body;
  const userId = req.user.id;

  const filterTransaksi = await searchTransaksiByUserIdPemasukan(userId);
  const danaTransaksi = filterTransaksi.map((trans) => trans.nominal);
  const totalDanaUser = danaTransaksi.reduce((acc, curr) => acc + curr, 0);

  const bukti_transaksi = req.file;

  if (totalDanaUser < 100000) {
    return resFailed(
      res,
      500,
      "error",
      "Mohon maaf, total nominal transaksi deposit anda belum mencapai Rp100000, tidak dapat withdraw",
    );
  }
  if (!bukti_transaksi) {
    return resFailed(res, 500, "error", "mohon sertakan bukti transaksi");
  }

  if (!userId) {
    return resFailed(res, 500, "error", "userId tidak boleh kosong");
  }

  if (!nominal) {
    return resFailed(res, 500, "error", "nominal kosong, mohon isi nominal");
  }

  if (!tgl) {
    return resFailed(res, 500, "error", "tanggal tidak boleh kosong");
  }

  if (!keterangan) {
    return resFailed(res, 500, "error", "mohon sertakan keterangan transaksi");
  }

  const keluar = await findAllTransaksiPengeluaran();
  const masuk = await findAllTransaksiPemasukan();
  const totalDanaMasuk = masuk.map((n) => n.nominal);
  const totalDanaKeluar = keluar.map((n) => n.nominal);
  const totalMasuk = totalDanaMasuk.reduce((acc, curr) => acc + curr, 0);
  const totalKeluar = totalDanaKeluar.reduce((acc, curr) => acc + curr, 0);
  const total = totalMasuk - totalKeluar;

  if (nominal > total) {
    return resFailed(res, 400, "error", "Dana koperasi tidak cukup");
  }
  if (nominal < 50000) {
    return resFailed(res, 400, "error", "Nominal penarikan minimal Rp50000");
  }
  if (nominal <= 0 || isNaN(nominal)) {
    return resFailed(res, 400, "error", "Nominal tidak valid");
  }
  if (totalDanaUser < nominal) {
    return resFailed(res, 400, "error", "Total dana deposit anda tidak cukup");
  }
  next();
};

const cekDepo = async (req, res, next) => {
  const { nominal, tgl, keterangan } = req.body;

  const bukti_transaksi = req.file;
  if (!bukti_transaksi) {
    return resFailed(res, 500, "error", "mohon sertakan bukti transaksi");
  }

  if (!nominal) {
    return resFailed(res, 500, "error", "nominal kosong, mohon isi nominal");
  }

  if (!tgl) {
    return resFailed(res, 500, "error", "tanggal tidak boleh kosong");
  }

  if (!keterangan) {
    return resFailed(res, 500, "error", "mohon sertakan keterangan transaksi");
  }

  if (nominal <= 0 || isNaN(nominal)) {
    return resFailed(res, 400, "error", "Angka tidak valid");
  }
  if (nominal < 50000) {
    return resFailed(res, 400, "error", "Nominal depo minimal Rp50000");
  }
  next();
};

module.exports = {
  cekIdTransaksi,
  cekBodyTransaksi,
  cekQuerySort,
  cekQuerySearchByStatus,
  cekWithdraw,
  cekDepo,
};
