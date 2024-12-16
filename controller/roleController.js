const { Role } = require('../models');

exports.getRoles = async (req, res) => {
    try {
        const roles = await Role.findAll();
        res.status(200).json({
            success: true,
            data: roles,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan saat mengambil data role',
        });
    }
};


