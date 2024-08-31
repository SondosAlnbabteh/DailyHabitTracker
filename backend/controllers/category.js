const Category = require("../models/category");

const getCategory = async (req, res) => {
    try {
        const allCategory = await Category.find();

        res.status(200).json({
            success: true,
            message: 'Category fetched successfully',
            data: allCategory 
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to get Category',
            error: error.message
        });
    }
};

module.exports = { getCategory };
