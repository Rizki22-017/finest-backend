const { Order, Product } = require('../models'); // Import model

exports.createOrder = async (req, res) => {
  try {
    const { product_id, user_id, investment_amount } = req.body;

    // Simpan nominal investasi user ke tabel Order
    const order = await Order.create({
      product_id,
      user_id,
      profil: investment_amount,
      investment_status: 'pending' // Status default
    });

    // Hitung total dana yang terkumpul dari semua order pada produk yang sama
    const totalFunds = await Order.sum('profil', { where: { product_id } });

    // Update kolom funds_collected di tabel Product
    await Product.update(
      { funds_collected: totalFunds },
      { where: { id: product_id } }
    );

    return res.status(201).json({
      message: 'Order berhasil dibuat!',
      order,
      funds_collected: totalFunds
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Terjadi kesalahan server.' });
  }
};
