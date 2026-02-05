const { resFailed, resSuccess } = require("../shared/helpers/payload");
const {
  findAllUser,
  findUserById,
  createUser,
  updateUser,
  deleteUser,
  findByRole,
  sortByNama,
  sortByEmail,
  regUser,
} = require("./service.js");
const bcrypt = require("bcrypt");

const getAllUser = async (req, res) => {
  try {
    const data = await findAllUser();
    return resSuccess(res, 200, "success", "Data User koperasi", data);
  } catch (error) {
    return resFailed(res, 500, "error", error.message);
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await findUserById(id);

    return resSuccess(res, 200, "success", "Data User koperasi", data);
  } catch (error) {
    return resFailed(res, 500, "error", error.message);
  }
};

const tambahUser = async (req, res) => {
  try {
    const { role, nama, password, email } = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const body = {
      role,
      nama,
      password: hashedPassword,
      email,
    };

    const data = await createUser(body);

    return resSuccess(res, 200, "success", "Data berhasil ditambahkan", data);
  } catch (error) {
    return resFailed(res, 500, "error", error.message);
  }
};

const regisUser = async (req, res) => {
  try {
    const { nama, password, email } = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const boda = {
      role: "anggota",
      nama,
      password: hashedPassword,
      email,
    };

    const data = await regUser(boda);

    return resSuccess(res, 200, "success", "Data berhasil diregister", data);
  } catch (error) {
    return resFailed(res, 500, "error", error.message);
  }
};

const ubahUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { role, nama, password, email } = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const body = {
      role,
      nama,
      password: hashedPassword,
      email,
    };

    const newData = await updateUser(id, body);

    return resSuccess(res, 200, "success", "Data berhasil diubah", body);
  } catch (error) {
    return resFailed(res, 500, "error", error.message);
  }
};

const hapusUser = async (req, res) => {
  try {
    const { id } = req.params;
    const cari = await findUserById(id);

    const data = await deleteUser(id);
    return resSuccess(res, 200, "success", "Data berhasil di hapus");
  } catch (error) {
    return resFailed(res, 500, "error", error.message);
  }
};

const cariByRole = async (req, res) => {
  try {
    const { role } = req.query;
    const cari = await findByRole(role);
    const data = await cari;
    return resSuccess(res, 200, "success", "Data berhasil diambil", data);
  } catch (error) {
    return resFailed(res, 500, "error", error.message);
  }
};

const urutBynama = async (req, res) => {
  try {
    const { order } = req.query;
    const low = order.toLowerCase();
    const data = await sortByNama(low);
    return resSuccess(res, 200, "success", "Sort data by Nama", data);
  } catch (error) {
    return resFailed(res, 500, "error", error.message);
  }
};

const urutByEmail = async (req, res) => {
  try {
    const { order } = req.query;
    const low = order.toLowerCase();
    const data = await sortByEmail(low);
    return resSuccess(res, 200, "success", "Sort data by Email", data);
  } catch (error) {
    return resFailed(res, 500, "error", error.message);
  }
};
// tmbah* cari per role #
// sort by nama dan email
// opsional refesh token
//

module.exports = {
  getAllUser,
  getUserById,
  hapusUser,
  tambahUser,
  cariByRole,
  ubahUser,
  urutBynama,
  urutByEmail,
  regisUser,
};
