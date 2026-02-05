const express = require("express");
const {
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
} = require("./controller");
const router = express.Router();
const upload = require("../shared/middlewares/upload.js");
const {
  cekIdTransaksi,
  cekBodyTransaksi,
  cekQuerySearchByStatus,
  cekQuerySort,
  cekWithdraw,
  cekDepo,
} = require("../shared/middlewares/valTransaksi.js");
const {
  authJwt,
  authorizeRole,
} = require("../shared/middlewares/loginAuth.js");

router.get(
  "/bendahara/alldata",
  authJwt,
  authorizeRole("bendahara"),
  getAllTransaksi,
);
router.get(
  "/bendahara/cari/:id",
  authJwt,
  authorizeRole("bendahara"),
  cekIdTransaksi,
  getTransaksiById,
);
router.delete(
  "/bendahara/hapus/:id",
  authJwt,
  authorizeRole("bendahara"),
  cekIdTransaksi,
  removeTransaksi,
);
router.patch(
  "/bendahara/ubah/:id",
  authJwt,
  authorizeRole("bendahara"),
  cekIdTransaksi,
  upload.single("bukti_transaksi"),
  cekBodyTransaksi,
  changeDataTransaksi,
);

router.get(
  "/total/dana",
  authJwt,
  authorizeRole("bendahara"),
  nominalAllTransaksi,
);
router.get(
  "/riwayat",
  authJwt,
  authorizeRole("bendahara"),
  cekQuerySort,
  sortTransaksiByDate,
);
router.get(
  "/riwayat/search",
  authJwt,
  authorizeRole("bendahara"),
  cekQuerySearchByStatus,
  filterTransaksiByStatus,
);
router.post(
  "/deposit",
  authJwt,
  authorizeRole("bendahara"),
  upload.single("bukti_transaksi"),
  cekDepo,
  createTransaksiAnggota,
);
router.post(
  "/withdraw",
  authJwt,
  authorizeRole("bendahara"),
  upload.single("bukti_transaksi"),
  cekWithdraw,
  withdrawMoney,
);
router.get(
  "/pemasukan",
  authJwt,
  authorizeRole("bendahara"),
  showDataPemasukan,
);
router.get(
  "/pengeluaran",
  authJwt,
  authorizeRole("bendahara"),
  showDataPengeluaran,
);

module.exports = router;
