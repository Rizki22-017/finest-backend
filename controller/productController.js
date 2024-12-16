const { Product } = require("../models");
const multer = require("multer");
const path = require("path");

// Setup storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/products"); // Directory where the image will be saved
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
}).single("product_pict"); // Specify the field name for the image

// Menambahkan data produk
exports.addProduct = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }

    const {
      category_id,
      product_name,
      desc,
      location,
      ponds_wide,
      production_capacity,
      feed_cost,
      worker_cost,
      maintenance_cost,
      selling_price,
      estimated_income,
      funds_managed,
      margin,
    } = req.body;

    if (!category_id || !product_name || !selling_price) {
      return res.status(400).json({
        success: false,
        message: "Kategori, nama produk, dan harga jual harus diisi",
      });
    }

    // Menyimpan data produk dengan path gambar
    const newProduct = await Product.create({
      category_id,
      product_name,
      desc,
      location,
      ponds_wide: parseFloat(ponds_wide),
      production_capacity: parseFloat(production_capacity),
      feed_cost: parseFloat(feed_cost),
      worker_cost: parseFloat(worker_cost),
      maintenance_cost: parseFloat(maintenance_cost),
      selling_price: parseFloat(selling_price),
      estimated_income: parseFloat(estimated_income),
      funds_managed: parseFloat(funds_managed),
      margin: parseFloat(margin),
      product_pict: req.file ? req.file.path : null, // Save image path
    });

    res.status(201).json({
      success: true,
      message: "Penambahan data berhasil",
      data: newProduct,
    });
  });
};

// Mengedit data produk
exports.updateProduct = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }

    const { id } = req.params;
    const {
      category_id,
      product_name,
      desc,
      location,
      ponds_wide,
      production_capacity,
      feed_cost,
      worker_cost,
      maintenance_cost,
      selling_price,
      estimated_income,
      funds_managed,
      margin,
    } = req.body;

    if (!category_id || !product_name || !selling_price) {
      return res.status(404).json({
        success: false,
        message: "Kategori, nama produk, dan harga jual harus diisi",
      });
    }

    const existingProduct = await Product.findByPk(id);

    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: "Produk tidak ditemukan",
      });
    }

    existingProduct.category_id = category_id;
    existingProduct.product_name = product_name;
    existingProduct.desc = desc;
    existingProduct.location = location;
    existingProduct.ponds_wide = parseFloat(ponds_wide);
    existingProduct.production_capacity = (production_capacity);
    existingProduct.feed_cost = parseFloat(feed_cost);
    existingProduct.worker_cost = parseFloat(worker_cost);
    existingProduct.maintenance_cost = parseFloat(maintenance_cost);
    existingProduct.selling_price = parseFloat(selling_price);
    existingProduct.estimated_income = parseFloat(estimated_income);
    existingProduct.funds_managed = parseFloat(funds_managed);
    existingProduct.margin = parseFloat(margin);

    if (req.file) {
      existingProduct.product_pict = req.file.path; 
    }

    await existingProduct.save();

    res.status(200).json({
      success: true,
      data: existingProduct,
    });
  });
};

//mengambil semua data
exports.getAllProducts = async (req, res) => {
    try {
        const product = await Product.findAll();
        res.status(200).json({
            success: true,
            data: product,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Gagal menampilkan data product",
        });
    }
};

//mengambil data berdasarkan id
exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Data tidak ditemukan",
            });
        }

        res.status(200).json({
            success: true,
            data: product,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Terjadi kesalahan saat mengambil data",
        });
    }
};

//menghapus data
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const productToDelete = await Product.findByPk(id);

        if(!productToDelete) {
            return res.status(404).json({
                success: false,
                message: "Data tidak ditemukan"
            });
        }

        await productToDelete.destroy();

        res.status(200).json({
            success: true,
            message: "Data berhasil dihapus"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Terjadi kesalahan saat menghapus data"
        });
    }
};