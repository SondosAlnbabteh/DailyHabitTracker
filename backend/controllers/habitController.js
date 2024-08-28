const Hebits = require('../models/habitModel'); 

const insertHebits = async (req, res) => {
    try {
   
        const newHebits = new Hebits(req.body);

        await newHebits.save();

        res.status(201).json({
            success: true,
            message: 'Hebits inserted successfully',
            data: newHebits
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to insert Hebits',
            error: error.message
        });
    }
};

const getHebits = async (req, res) => {
    try {
    
        const allHebits = await Hebits.find({ idDelete: false });


        res.status(200).json({
            success: true,
            message: 'Hebits fetched successfully',
            data: allHebits
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to get Hebits',
            error: error.message
        });
    }
};


const updateHebits = async (req, res) => {
    try {
        const { id } = req.params; // الحصول على المعرّف من المعاملات
        const updateData = req.body; // الحصول على البيانات المحدثة من جسم الطلب

        // استخدام كائن كشرط للتصفية
        const newHebits = await Hebits.findOneAndUpdate({ _id: id }, updateData, {
            new: true,  // Return the updated document
            runValidators: true 
        });

        if (!newHebits) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            data: newHebits
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update Hebits',
            error: error.message
        });
    }
};

const deleteHebits = async (req, res) => {
    try {
        const { id } = req.params; 
        const updateData = req.body; 

     
            updateData.idDelete = true;
     

       
        const newHebits = await Hebits.findOneAndUpdate({ _id: id }, updateData, {
            new: true, 
            runValidators: true 
        });

        if (!newHebits) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            data: newHebits
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update Hebits',
            error: error.message
        });
    }
};

module.exports = {insertHebits, updateHebits, getHebits, deleteHebits};