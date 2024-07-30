const mongoose = require('mongoose');
const user = require('./authModel');

const usercredmodel = new mongoose.Schema({
    service : {
        type : String,
        required : true
    },
    username : {
        type : String
    },
    email : {
        type : String
    },
    password : {
        type : String,
        required : true
    }
});

const userCred = mongoose.model('Usercred', usercredmodel);
module.exports = userCred;