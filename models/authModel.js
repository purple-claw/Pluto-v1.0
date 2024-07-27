const mongoose = require('mongoose');

const regSchema = new mongoose.Schema({
    username :{
        type: String,
        required : true,
        unique: true
    },
    email :{
        type : String,
        required : true
    },
    password :{
        type : String,
        required: true
    }
});

const user = mongoose.model('User', regSchema);
module.exports = user;

