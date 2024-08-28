const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
    name: String,
    description: String,
    category: String,
    isDone: {
        type: Boolean,
        default: false
    }
    ,
    idDelete:{

        type: Boolean,
        default: false
    } ,
    
});



const Hebits = mongoose.model('Hebits', habitSchema);
module.exports = Hebits;
