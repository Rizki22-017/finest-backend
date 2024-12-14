const { Category } = require("../models"); 
const { query } = require("../database/db");

// Fungsi untuk mengambil seluruh data kategori
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll(); // Mengambil semua data dari tabel Category
    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to load category data",
    });
  }
};

//mengambil data kategori berdasarkan id
exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params; // Mengambil ID dari URL params

    // Mencari kategori berdasarkan ID
    const category = await Category.findByPk(id); // `findByPk` untuk mencari berdasarkan primary key (ID)

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Kategori tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat mengambil data kategori",
    });
  }
};

//tambah data cara query
// exports.addCategory = async (req, res) => {
//     const { category } = req.body; //isi data

//     try {
//         await query(`INSERT INTO category (category) VALUES(?,?)`, [category]);
//         return res.status(200).json({
//             msg: "Add category successfully",
//             data: {
//                 ...req.body,
//             },
//         });
//     } catch (error) {
//         console.log("Failed add category", error);
//     }
// };

//cara mudah menambahkan data
exports.addCategory = async (req, res) => {
  try {
    const { category } = req.body;

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category name cannot be empty",
      });
    }

    const newCategory = await Category.create({ category });

    res.status(201).json({
      success: true,
      message: "Berhasil yeay",
      data: newCategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to add category",
    });
  }
};

//edit data berdasarkan id
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params; 
    const { category } = req.body; 

    if (!category) {
      return res.status(400).json({
        success: false,
        message: 'Nama kategori tidak boleh kosong'
      });
    }

    const existingCategory = await Category.findByPk(id);

    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        message: 'Kategori tidak ditemukan'
      });
    }

    existingCategory.category = category;
    await existingCategory.save();

    res.status(200).json({
      success: true,
      data: existingCategory
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat memperbarui kategori'
    });
  }
};

//delete data by id
exports.deleteCategory = async (req, res) => {
    try {
      const { id } = req.params; 

      const categoryToDelete = await Category.findByPk(id);
  
      if (!categoryToDelete) {
        return res.status(404).json({
          success: false,
          message: 'Kategori tidak ditemukan'
        });
      }

      await categoryToDelete.destroy();
  
      res.status(200).json({
        success: true,
        message: 'Kategori berhasil dihapus'
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan saat menghapus kategori'
      });
    }
  };