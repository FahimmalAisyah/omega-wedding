const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const session = require("express-session");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3000;

// Database configuration
const pool = new Pool({
  user: "postgres", // Ganti dengan nama pengguna PostgreSQL Anda
  host: "localhost", // Ganti dengan host Anda
  database: "db.wo", // Ganti dengan nama database Anda
  password: "admin123", // Ganti dengan kata sandi PostgreSQL Anda
  port: 5432,
});

// Konfigurasi multer untuk mengunggah file gambar
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/resource"); // Folder penyimpanan gambar
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Nama file yang disimpan
  },
});
const upload = multer({ storage: storage });

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

const midtransClient = require("midtrans-client");

// Inisialisasi Midtrans client
const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: "SB-Mid-server-iBJdWbxE4ThqBYxuI0gNEzIY",
  clientKey: "SB-Mid-client-n2tdNJUFR874Z_MF",
});

// Routes

//login
app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const { userName, password } = req.body;

  const query = `SELECT * FROM akun WHERE "userName" = $1`;

  try {
    const result = await pool.query(query, [userName]);
    const user = result.rows[0];

    if (user && bcrypt.compareSync(password, user.password)) {
      req.session.userName = user.userName;
      req.session.role = user.role; // Tambahkan peran pengguna ke session

      if (user.role === 1) {
        res.redirect("/dashboard"); // Redirect ke dashboard jika peran adalah 1
      } else if (user.role === 2) {
        res.redirect("/"); // Redirect ke halaman paket jika peran adalah 2
      }
    } else {
      res.send(
        '<script>alert("Username atau password salah"); window.location="/login";</script>'
      );
    }
  } catch (error) {
    console.error(error);
    res.send(
      '<script>alert("Terjadi kesalahan"); window.location="/login";</script>'
    );
  }
});

app.get("/logout", (req, res) => {
  // Hapus session userName
  delete req.session.userName;

  // Redirect ke halaman login atau halaman lain yang Anda tentukan
  res.redirect("/login");
});

app.get("/index", async (req, res) => {
  try {
    akun;
    const result = await pool.query('SELECT * FROM produk ORDER BY "id" DESC');
    const result2 = await pool.query('SELECT * FROM produk ORDER BY "id" DESC');
    res.render("index", { data: result.rows, userName: req.session.userName });
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send("Internal Server Error");
  }
});

//registrasi
app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  const { userName, password, nama, no_telp, alamat } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  const query = `INSERT INTO public.akun("userName", password, nama, nomor_telepon , alamat, role) VALUES ($1, $2, $3, $4, $5, 2)`;

  try {
    await pool.query(query, [userName, hashedPassword, nama, no_telp, alamat]);
    res.send(
      '<script>alert("Registrasi berhasil"); window.location="/login";</script>'
    );
  } catch (error) {
    console.error(error);
    res.send(
      '<script>alert("Terjadi kesalahan"); window.location="/register";</script>'
    );
  }
});

app.get("/", async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM produk ORDER BY "id" DESC');
    res.render("index", { data: result.rows, userName: req.session.userName });
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send("Internal Server Error");
  }
});

// Rute untuk memperoleh data paket
app.get("/paket", async (req, res) => {
  if (!req.session.userName) {
    return res.redirect("/login");
  }
  try {
    const result = await pool.query('SELECT * FROM produk ORDER BY "id" DESC');
    res.render("paket", { paket: result.rows, userName: req.session.userName });
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/galeri", async (req, res) => {
  if (!req.session.userName) {
    return res.redirect("/login");
  }
  try {
    const result = await pool.query("SELECT * FROM galeri");
    res.render("galeri", {
      galeri: result.rows,
      userName: req.session.userName,
    });
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/detailpaket", async (req, res) => {
  try {
    const { id } = req.query;

    // Query untuk menyeleksi data produk berdasarkan ID
    const produkQuery = "SELECT * FROM produk WHERE id = $1";
    const produkResult = await pool.query(produkQuery, [id]);

    // Query untuk menyeleksi data detailproduk berdasarkan kategori
    const detailmua =
      "SELECT * FROM detailproduk WHERE kategori = 'mua' AND id_produk = $1 ";
    const detailmuaResult = await pool.query(detailmua, [id]);

    const detailphoto =
      "SELECT * FROM detailproduk WHERE kategori = 'photo' AND id_produk = $1";
    const detailphotoResult = await pool.query(detailphoto, [id]);

    const detaildancer =
      "SELECT * FROM detailproduk WHERE kategori = 'dancer' AND id_produk = $1";
    const detaildancerResult = await pool.query(detaildancer, [id]);

    const detailentertaiment =
      "SELECT * FROM detailproduk WHERE kategori = 'entertain' AND id_produk = $1";
    const detailentertaimentResult = await pool.query(detailentertaiment, [id]);

    const detailfood =
      "SELECT * FROM detailproduk WHERE kategori = 'food' AND id_produk = $1";
    const detailfoodResult = await pool.query(detailfood, [id]);

    const detaildekorasi =
      "SELECT * FROM detailproduk WHERE kategori = 'dekorasi' AND id_produk = $1";
    const detaildekorasiResult = await pool.query(detaildekorasi, [id]);

    // Mengirim data ke halaman detailpaket.ejs
    res.render("detailpaket", {
      produk: produkResult.rows[0],
      detailprodukdekorasi: detaildekorasiResult.rows,
      detailprodukmua: detailmuaResult.rows,
      detailprodukphoto: detailphotoResult.rows,
      detailprodukdancer: detaildancerResult.rows,
      detailprodukentertaiment: detailentertaimentResult.rows,
      detailprodukfood: detailfoodResult.rows,
      userName: req.session.userName,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Terjadi kesalahan pada server");
  }
});

app.get("/order", async (req, res) => {
  try {
    if (!req.session.userName) {
      return res.redirect("/login");
    }
    const { id } = req.query;
    const akun = req.session.userName;

    // Query untuk menyeleksi data produk berdasarkan ID
    const produkQuery = "SELECT * FROM produk WHERE id = $1";
    const produkResult = await pool.query(produkQuery, [id]);

    const akunQuery = `
      SELECT "Id", "userName", password, nama, alamat, role, nomor_telepon, email
      FROM public.akun 
      WHERE "userName" = $1;
    `;
    const akunResult = await pool.query(akunQuery, [akun]);

    const formatCurrency = (value) =>
      new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(value);

    if (produkResult.rows.length === 0 || akunResult.rows.length === 0) {
      return res.status(404).send("Data not found");
    }

    // Mengirim data ke halaman detailpaket.ejs
    res.render("order", {
      produk: produkResult.rows[0],
      profile: akunResult.rows[0],
      userName: req.session.userName,
      formatCurrency: formatCurrency,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Terjadi kesalahan pada server");
  }
});

// Route untuk insert data
// app.post("/insert", async (req, res) => {
//   const { id_produk, statuspembayaran, tanggalacara } = req.body;

//   // Menggunakan tanggal hari ini untuk tanggal bayar dan tanggal transaksi
//   const today = new Date().toISOString().split("T")[0];

//   // Validasi tanggal acara
//   const acaraDate = new Date(tanggalacara);
//   const currentDate = new Date(today);

//   if (acaraDate.getTime() < currentDate.getTime()) {
//     // Tampilkan popup jika tanggal acara kurang dari tanggal hari ini
//     return res.send(
//       '<script>alert("Tanggal tidak boleh kurang dari hari pemesanan"); window.location="/";</script>'
//     );
//   }

//   const queryCheck = `
//       SELECT * FROM public.riwayatpembelian
//       WHERE tanggalacara = $1;
//   `;

//   try {
//     const checkResult = await pool.query(queryCheck, [tanggalacara]);

//     if (checkResult.rows.length > 0) {
//       // Tampilkan popup jika tanggal acara sudah ada di database
//       return res.send(
//         '<script>alert("Tanggal ini sudah di booking"); window.location="/";</script>'
//       );
//     }

//     // Query untuk mendapatkan data produk berdasarkan id_produk
//     const queryGetProduct = `
//       SELECT * FROM public.produk
//       WHERE id = $1;
//     `;

//     const productResult = await pool.query(queryGetProduct, [id_produk]);
//     const { harga, namapaket } = productResult.rows[0];

//     const query = `
//         INSERT INTO public.riwayatpembelian(
//             id_produk, statuspembayaran, tanggalacara, tanggalbayar, tanggaltransaksi
//         )
//         VALUES ($1, $2, $3, $4, $5)
//         RETURNING *;  -- Mengembalikan semua kolom untuk data yang baru ditambahkan
//     `;

//     await pool.query(query, [
//       id_produk,
//       statuspembayaran,
//       tanggalacara,
//       today,
//       today,
//     ]);

//     const namapelanggan = "Fahimmal";

//     function generateOrderNumber() {
//       return Math.floor(100000 + Math.random() * 900000);
//     }

//     const orderNumber = generateOrderNumber();
//     const formatCurrency = (value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
//     const data  = {
//       id_produk,
//       statuspembayaran,
//       tanggalacara,
//       today,
//       today,
//       harga,
//       namapaket,
//       namapelanggan,
//       orderNumber,
//       formatCurrency: formatCurrency
//     };

//     // Menampilkan view sukses dengan data yang baru ditambahkan
//     res.render('success', {
//       ...data,
//       hargaFormatted: formatCurrency(data.harga)
//     });

//   } catch (error) {
//     console.error(error);

//     // Menampilkan popup jika terjadi kesalahan
//     res.send(
//       '<script>alert("Terjadi kesalahan"); window.location="/";</script>'
//     );
//   }
// });

app.post("/insert", async (req, res) => {
  if (!req.session.userName) {
    return res.redirect("/login");
  }

  const akun = req.session.userName;
  const { id_produk, statuspembayaran, tanggalacara } = req.body;

  // Menggunakan tanggal hari ini untuk tanggal bayar dan tanggal transaksi
  const today = new Date().toISOString().split("T")[0];

  // Validasi tanggal acara
  const acaraDate = new Date(tanggalacara);
  const currentDate = new Date(today);

  if (acaraDate.getTime() < currentDate.getTime()) {
    return res.send(
      '<script>alert("Tanggal tidak boleh kurang dari hari pemesanan"); window.location="/";</script>'
    );
  }

  const queryCheck = `
    SELECT * FROM public.riwayatpembelian
    WHERE tanggalacara = $1;
  `;

  try {
    const checkResult = await pool.query(queryCheck, [tanggalacara]);

    if (checkResult.rows.length > 0) {
      return res.send(
        '<script>alert("Tanggal ini sudah di booking"); window.location="/";</script>'
      );
    }

    // Ambil harga dan namapaket dari tabel produk
    const queryGetPrice = `
      SELECT id, harga, namapaket FROM public.produk WHERE id = $1;
    `;

    const priceResult = await pool.query(queryGetPrice, [id_produk]);
    const { harga, namapaket } = priceResult.rows[0];

    // Midtrans Integration
    const transactionDetails = {
      order_id: `ORDER-${Math.round(new Date().getTime() / 1000)}`,
      gross_amount: harga,
    };

    const creditCardOptions = {
      save_card: false,
    };

    const customerDetails = {
      first_name: "John",
      last_name: "Doe",
      email: "john.doe@example.com",
      phone: "081234567890",
    };

    const creditCard = {
      secure: true,
    };

    const itemDetails = [
      {
        id: id_produk,
        price: harga,
        quantity: 1,
        name: namapaket, // Nama produk atau paket yang dibeli
      },
    ];

    const parameter = {
      transaction_details: transactionDetails,
      credit_card: creditCard,
      customer_details: customerDetails,
      credit_card_option: creditCardOptions,
      item_details: itemDetails, // Menambahkan item paket yang dibeli
    };

    snap
      .createTransaction(parameter)
      .then(async (transaction) => {
        const redirectUrl = transaction.redirect_url;

        // Menyimpan data ke dalam tabel riwayatpembelian setelah pembayaran berhasil
        const queryInsert = `
          INSERT INTO public.riwayatpembelian(
            id_produk, statuspembayaran, tanggalacara, tanggalbayar, tanggaltransaksi
          )
          VALUES ($1, $2, $3, $4, $5);
        `;

        const result = await pool.query(queryInsert, [
          id_produk,
          "berhasil",
          tanggalacara,
          today,
          today,
        ]);

        // user to Midtrans payment page
        res.redirect(redirectUrl);
      })
      .catch((err) => {
        console.error(err);
        res.send(
          '<script>alert("Terjadi kesalahan saat memproses pembayaran"); window.location="/";</script>'
        );
      });
  } catch (error) {
    console.error(error);
    res.send(
      '<script>alert("Terjadi kesalahan"); window.location="/";</script>'
    );
  }
});

// app.post("/insert", async (req, res) => {
//   if (!req.session.userName) {
//     return res.redirect("/login");
//   }

//   const akun = req.session.userName;
//   const { id_produk, statuspembayaran, tanggalacara } = req.body;

//   // Menggunakan tanggal hari ini untuk tanggal bayar dan tanggal transaksi
//   const today = new Date().toISOString().split("T")[0];

//   // Validasi tanggal acara
//   const acaraDate = new Date(tanggalacara);
//   const currentDate = new Date(today);

//   if (acaraDate.getTime() < currentDate.getTime()) {
//     return res.render("error", {
//       errorMessage: "Tanggal tidak boleh kurang dari hari pemesanan",
//       id_produk,
//     });
//   }

//   const queryCheck = `
//     SELECT * FROM public.riwayatpembelian
//     WHERE tanggalacara = $1;
//   `;

//   try {
//     const checkResult = await pool.query(queryCheck, [tanggalacara]);

//     if (checkResult.rows.length > 0) {
//       return res.render("error", {
//         errorMessage: "Tanggal Acara Sudah Di-Booking",
//         id_produk,
//       });
//     }

//     // Ambil harga dan namapaket dari tabel produk
//     const queryGetPrice = `
//       SELECT id, harga, namapaket FROM public.produk WHERE id = $1;
//     `;

//     const priceResult = await pool.query(queryGetPrice, [id_produk]);
//     const { harga, namapaket } = priceResult.rows[0];

//     // Query to get account details
//     const queryGetAccount = `
//       SELECT "Id", "userName", password, nama, alamat, role, nomor_telepon, email
//       FROM public.akun
//       WHERE "userName" = $1;
//     `;

//     const accountResult = await pool.query(queryGetAccount, [akun]);
//     const accountDetails = accountResult.rows[0];

//     // Midtrans Integration
//     const transactionDetails = {
//       order_id: `ORDER-${Math.round(new Date().getTime() / 1000)}`,
//       gross_amount: harga,
//     };

//     const creditCardOptions = {
//       save_card: false,
//     };

//     const customerDetails = {
//       first_name: accountDetails.nama.split(" ")[0],
//       last_name: accountDetails.nama.split(" ").slice(1).join(" "),
//       email: accountDetails.email,
//       phone: accountDetails.nomor_telepon || "081234567890",
//       address: accountDetails.alamat,
//     };

//     const creditCard = {
//       secure: true,
//     };

//     const itemDetails = [
//       {
//         id: id_produk,
//         price: harga,
//         quantity: 1,
//         name: namapaket, // Nama produk atau paket yang dibeli
//       },
//     ];

//     const parameter = {
//       transaction_details: transactionDetails,
//       credit_card: creditCard,
//       customer_details: customerDetails,
//       credit_card_option: creditCardOptions,
//       item_details: itemDetails, // Menambahkan item paket yang dibeli
//     };

//     snap
//       .createTransaction(parameter)
//       .then(async (transaction) => {
//         const redirectUrl = transaction.redirect_url;

//         // Menyimpan data ke dalam tabel riwayatpembelian setelah pembayaran berhasil
//         const queryInsert = `
//           INSERT INTO public.riwayatpembelian(
//             id_produk, statuspembayaran, tanggalacara, tanggalbayar, tanggaltransaksi, id_akun
//           )
//           VALUES ($1, $2, $3, $4, $5, $6);
//         `;

//         const result = await pool.query(queryInsert, [
//           id_produk,
//           "berhasil",
//           tanggalacara,
//           today,
//           today,
//           accountDetails.Id,
//         ]);

//         // Redirect user to Midtrans payment page
//         res.redirect(redirectUrl);
//       })
//       .catch((err) => {
//         console.error(err);
//         res.render("error", {
//           errorMessage: "Gagal Melakukan Pembayaran",
//           id_produk,
//         });
//       });
//   } catch (error) {
//     console.error(error);
//     res.render("error", { errorMessage: "Terjadi kesalahan", id_produk });
//   }
// });

app.get("/history", async (req, res) => {
  if (!req.session.userName) {
    return res.redirect("/login");
  }

  try {
    const data = req.session.userName;
    const akun = 'SELECT "Id" FROM akun WHERE "userName" =  $1 ';

    const accountResult = await pool.query(akun, [data]);
    const accountDetails = accountResult.rows[0];

    const result = await pool.query(
      "SELECT  produk.namapaket,produk.harga, riwayatpembelian.statuspembayaran,riwayatpembelian.tanggalacara, " +
        "riwayatpembelian.tanggaltransaksi FROM riwayatpembelian JOIN produk  ON  riwayatpembelian.id_produk = produk.id"
    );
    const historyData = result.rows;

    res.render("history", {
      data: historyData,
      userName: req.session.userName,
    });
  } catch (error) {
    console.error(error);
    res.send("Terjadi kesalahan");
  }
});

// Route untuk menampilkan view sukses
app.get("/success", (req, res) => {
  res.render("success");
});

//Admin
// Handle CRUD operations here

//dashboard
app.get("/dashboard", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
          a.nama,
          a.alamat,
          a.nomor_telepon,
          rp.id AS riwayat_id, 
          rp.id_produk, 
          rp.statuspembayaran, 
          rp.tanggalacara, 
          rp.tanggalbayar, 
          rp.tanggaltransaksi, 
          p.id AS produk_id, 
          p.namapaket, 
          p.deskripsi, 
          p.harga, 
          p.gambar 
      FROM 
          public.riwayatpembelian rp 
      JOIN 
          public.produk p ON rp.id_produk = p.id 
      JOIN 
          public.akun a ON rp.id_akun = a."Id"`
    );

    res.render("admin/dashboard", {
      userName: req.session.userName,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/paket-admin", async (req, res) => {
  const successMessage = req.session.successMessage;
  try {
    const result = await pool.query(
      "SELECT id ,namapaket, deskripsi, harga, gambar, gambar2 FROM public.produk ORDER BY id DESC"
    );
    req.session.successMessage = null;
    res.render("admin/paket", {
      userName: req.session.userName,
      data: result.rows,
      success: req.query.success,
      successMessage,
    });
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send("Internal Server Error");
  }
});

// Halaman form untuk menambah atau mengedit produk
// app.get("/produk", (req, res) => {
//   res.render("admin/produk_form");
// });
app.get("/produk", async (req, res) => {
  try {
    const { id } = req.query;
    let data = {};
    if (id) {
      // Jika ada ID, maka ini adalah mode edit, ambil data produk dari database
      const result = await pool.query(
        "SELECT * FROM public.produk WHERE id = $1",
        [id]
      );
      data = result.rows[0];
    }
    res.render("admin/produk_form", { data });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Meng-handle pengiriman data dari form
app.post(
  "/produk",
  upload.fields([{ name: "gambar1" }, { name: "gambar2" }]),
  async (req, res) => {
    try {
      let { id, namapaket, deskripsi, harga } = req.body;
      let { gambar1, gambar2 } = req.files;

      let filename1 = gambar1 ? gambar1[0].filename : null;
      let filename2 = gambar2 ? gambar2[0].filename : null;

      if (id) {
        // Mode edit, update data produk
        await pool.query(
          "UPDATE public.produk SET namapaket = $1, deskripsi = $2, harga = $3, gambar = $4, gambar2 = $5 WHERE id = $6",
          [namapaket, deskripsi, harga, filename1, filename2, id]
        );
      } else {
        // Mode tambah, tambahkan data produk baru
        const result = await pool.query(
          "INSERT INTO public.produk(namapaket, deskripsi, harga, gambar, gambar2) VALUES ($1, $2, $3, $4, $5) RETURNING id",
          [namapaket, deskripsi, harga, filename1, filename2]
        );
        id = result.rows[0].id;
      }
      // Redirect with success message
      res.redirect("/paket-admin?success=true");
    } catch (error) {
      console.error("Error:", error);
      res.redirect("/paket-admin?success=true");
    }
  }
);

app.get("/deleteproduk/:id", async (req, res) => {
  const productId = parseInt(req.params.id);

  if (isNaN(productId)) {
    return res.status(400).json({ message: "ID produk tidak valid." });
  }

  try {
    const query = "DELETE FROM public.produk WHERE id = $1";
    const result = await pool.query(query, [productId]);

    // Menyimpan pesan dalam session
    req.session.successMessage = "Produk berhasil dihapus.";

    // Mengarahkan kembali ke halaman /paket-admin setelah produk berhasil dihapus
    res.redirect("/paket-admin");
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan saat menghapus produk." });
  }
});

app.get("/detail-paket", async (req, res) => {
  const successMessage = req.session.successMessage;
  try {
    const result = await pool.query(
      "SELECT dp.id, dp.id_produk, dp.gambarproduk, dp.kategori, dp.keterangan, p.namapaket FROM public.detailproduk dp INNER JOIN public.produk p ON dp.id_produk = p.id ORDER BY dp.id DESC"
    );
    req.session.successMessage = null;
    res.render("admin/detail", {
      userName: req.session.userName,
      data: result.rows,
      success: req.query.success,
      successMessage,
    });
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/detail", async (req, res) => {
  try {
    const { id } = req.query;
    let data = {};
    let produk = {};
    if (id) {
      // Jika ada ID, maka ini adalah mode edit, ambil data produk dari database
      const result = await pool.query(
        "SELECT * FROM public.detailproduk WHERE id = $1",
        [id]
      );
      data = result.rows[0];
    }
    const select = await pool.query("SELECT * FROM public.produk");
    produk = select.rows;
    res.render("admin/detail_form", { data, produk });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/detail-produk", upload.single("gambar"), async (req, res) => {
  try {
    let { id, id_produk, kategori, keterangan } = req.body; // Menggunakan let alih-alih const
    let { filename } = req.file || {};

    if (id) {
      // Mode edit, update data detailproduk
      await pool.query(
        "UPDATE public.detailproduk SET id_produk = $1, gambarproduk = $2, kategori = $3, keterangan = $4 WHERE id = $5",
        [id_produk, filename, kategori, keterangan, id]
      );
    } else {
      // Mode tambah, tambahkan data detailproduk baru
      const result = await pool.query(
        "INSERT INTO public.detailproduk(id_produk, gambarproduk, kategori, keterangan) VALUES ($1, $2, $3, $4) RETURNING id",
        [id_produk, filename, kategori, keterangan]
      );
      // Ambil ID dari data yang baru ditambahkan
      id = result.rows[0].id;
    }
    res.redirect("/detail-paket?success=true");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
    res.redirect("/detail-paket?success=false");
  }
});

app.get("/deletedetail/:id", async (req, res) => {
  const productId = parseInt(req.params.id);

  if (isNaN(productId)) {
    return res.status(400).json({ message: "ID produk tidak valid." });
  }

  try {
    const query = "DELETE FROM public.detailproduk WHERE id = $1";
    const result = await pool.query(query, [productId]);

    // Menyimpan pesan dalam session
    req.session.successMessage = "Produk berhasil dihapus.";

    // Mengarahkan kembali ke halaman /paket-admin setelah produk berhasil dihapus
    res.redirect("/detail-paket");
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan saat menghapus produk." });
  }
});

app.get("/admin-galeri", async (req, res) => {
  const successMessage = req.session.successMessage;
  try {
    const result = await pool.query(
      "SELECT id, judul, deskripsi, tanggal_post, gambar FROM public.galeri"
    );
    req.session.successMessage = null;
    res.render("admin/galeri", {
      userName: req.session.userName,
      data: result.rows,
      success: req.query.success,
      successMessage,
    });
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/galeri-edit", async (req, res) => {
  try {
    const { id } = req.query;
    let data = {};
    let produk = {};
    if (id) {
      // Jika ada ID, maka ini adalah mode edit, ambil data produk dari database
      const result = await pool.query(
        "SELECT * FROM public.galeri WHERE id = $1",
        [id]
      );
      data = result.rows[0];
    }
    const select = await pool.query("SELECT * FROM public.galeri");
    produk = select.rows;
    res.render("admin/galeri_form", { data, produk });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/galeri-update", upload.single("gambar"), async (req, res) => {
  try {
    let { id, judul, deskripsi, tanggal_post } = req.body; // Menggunakan let alih-alih const
    let { filename } = req.file || {};

    if (id) {
      // Mode edit, update data detailproduk
      await pool.query(
        "UPDATE public.galeri SET judul=$1, deskripsi=$2, tanggal_post=$3, gambar=$4 WHERE id = $5",
        [judul, deskripsi, tanggal_post, filename, id]
      );
    } else {
      // Mode tambah, tambahkan data detailproduk baru
      const result = await pool.query(
        "INSERT INTO public.galeri( judul, deskripsi, tanggal_post, gambar) VALUES ($1, $2, $3, $4) RETURNING id",
        [judul, deskripsi, tanggal_post, filename]
      );
      // Ambil ID dari data yang baru ditambahkan
      id = result.rows[0].id;
    }
    res.redirect("/admin-galeri?success=true");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
    res.redirect("/admin-galeri?success=false");
  }
});

app.get("/deletegaleri/:id", async (req, res) => {
  const productId = parseInt(req.params.id);

  if (isNaN(productId)) {
    return res.status(400).json({ message: "ID produk tidak valid." });
  }

  try {
    const query = "DELETE FROM public.galeri WHERE id = $1";
    const result = await pool.query(query, [productId]);

    // Menyimpan pesan dalam session
    req.session.successMessage = "Produk berhasil dihapus.";

    // Mengarahkan kembali ke halaman /paket-admin setelah produk berhasil dihapus
    res.redirect("/admin-galeri");
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan saat menghapus produk." });
  }
});

app.get("/riwayat", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
          a.nama,
          a.alamat,
          a.nomor_telepon,
          rp.id AS riwayat_id, 
          rp.id_produk, 
          rp.statuspembayaran, 
          rp.tanggalacara, 
          rp.tanggalbayar, 
          rp.tanggaltransaksi, 
          p.id AS produk_id, 
          p.namapaket, 
          p.deskripsi, 
          p.harga, 
          p.gambar 
      FROM 
          public.riwayatpembelian rp 
      JOIN 
          public.produk p ON rp.id_produk = p.id 
      JOIN 
          public.akun a ON rp.id_akun = a."Id"`
    );

    res.render("admin/riwayatpenjualan", {
      userName: req.session.userName,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send("Internal Server Error");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
