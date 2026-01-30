// const express = require("express");
// const  sequelize  = require("./config/koneksi.js");
// const app = express();



// // Middleware untuk parsing JSON
// //  ini adalah tools
// app.use(express.urlencoded({ extended:true }));
// app.use(express.json());

// app.get("/", async (req, res) => {
//     try {
//         await sequelize.authenticate();
//         return res.status(200).json({message: "bisa"})
//     } catch (error) {
//         return res.status(500).json({message: "ga bisa : " + error.message})
//     }
// })
// const PORT = 3003;


// // Jalankan server
// app.listen(PORT, () => {
//   console.log(`Server berjalan... di http://localhost:${PORT}`);
// });

const express = require("express");
const app = express();
const sequelize = require("./config/koneksi.js");
// const routerA = require("./alat/route.js");
// const routerP = require("./peminjaman/route.js");
// const path = require("path");
// const { publicDecrypt } = require("crypto");

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use('/api', express.static(path.join(__dirname, 'uploads')));
//__dirname digunkan untuk membaca posisi direktori saat ini
// upload itu adalah nama folder yang bisa diakses secara public 
// api adalah nama prefiknya untuk endpoint dari folder yang bsisa diakses secara public
app.get("/", async (req, res) => {
  try {
    await sequelize.authenticate();
    return res.json({ message: "Data berhasil terkoneksi" });
  } catch (error) {
    return res.json({ message: error.message });
  }
});

// app.use("/api/alat", routerA);
// app.use("/api/peminjaman", routerP);

app.listen(3001, () => {
  console.log("RUNNING");
});
