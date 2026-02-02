const express = require("express");

const sequelize = require("./config/koneksi.js");
const routeTransaksi = require("./transaksi/router.js");
const routeUser = require("./user/router.js");
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", async (req, res) => {
  try {
    await sequelize.authenticate();
    return res.status(200).json({ message: "bisa" });
  } catch (error) {
    return res.status(500).json({ message: "ga bisa : " + error.message });
  }
});
const PORT = 3040;

app.use("/api/transaksi", routeTransaksi);
app.use("/api/user", routeUser);

app.listen(PORT, () => {
  console.log(`Server berjalan... di http://localhost:${PORT}`);
});
