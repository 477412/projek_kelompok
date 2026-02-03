const express = require("express");
const {
  getAllUser,
  getUserById,
  hapusUser,
  tambahUser,
  ubahUser,
  cariByRole,
  urutBynama,
  urutByEmail,
} = require("./controller");
const {
  cekId,
  cekTambah,
  cekUpdate,
  cekRole,
  cekSort,
} = require("../shared/middlewares/valUser.js");
const router = express.Router();
const upload = require("../shared/middlewares/upload.js");
const { loginAuth } = require("./authControll.js");
const {
  valLog,
  authJwt,
  authorizeRole,
} = require("../shared/middlewares/loginAuth.js");

router.get(
  "/bendahara/alldata",
  authJwt,
  authorizeRole("bendahara"),
  getAllUser,
);
router.get("/cari/:id", cekId, getUserById);
router.delete("/hapus/:id", cekId, hapusUser);
router.post("/tambah", upload.none(), cekTambah, tambahUser);
router.patch("/ubah/:id", upload.none(), cekUpdate, ubahUser);
router.post("/auth/login", valLog, loginAuth);
router.get("/search", cekRole, cariByRole);
router.get("/sort/nama", cekSort, urutBynama);
router.get("/sort/email", cekSort, urutByEmail);

module.exports = router;
