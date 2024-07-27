const user = require('../models/authModel');

exports.registerUser = async (req,res) => {
    try {
        const newuser = user.create(req.body);
        res.status(200).json({
            status : "Success",
            message : "User Created Succesfully",
            data : {
                user : newuser
            }
        })
    }catch (err) {
        res.status(400).json({
            status : "Fail",
            message : err
        });
    }
};

exports.getUser = async (req,res) => {
    try {
        const userdet = await user.find()
        res.status(200).json({
            status : "Success",
            data : {
                user : userdet
            }
        })
    }catch (err) {
        res.status(400).json({
            status : 'Fail',
            message : err
        })
    }
};
