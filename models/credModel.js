const mongoose = require('mongoose');

const credSchema = new mongoose.Schema({
    parameter : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    slug : {
        type : String
    }
});

const Cred = mongoose.model('Cred', credSchema);
module.exports = Cred;
