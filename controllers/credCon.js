const creds = require('../models/credModel');

exports.getAllCreds = async (req,res) => {
    try {
        const findcred = await creds.find();
        res.status(200).json({
            status : "Success",
            message : "Your Credentials are Here",
            data : {
                cred : findcred
            }
        });
    } catch (err) {
        res.status(400).json({
            status : "fail",
            message : err
        });
    }
};

exports.createCred = async (req,res) => {
    try {
        const cred_create = await creds.create(req.body);
        res.status(200).json({
            status : "Success",
            message : "New Cred Created Succesfully",
            data : {
                newCred : cred_create
            }
        });
    } catch (err) {
        res.status(400).json({
            status : "Fail",
            message : err
        });
    };
};

exports.findCred =  async (req,res) =>{
    try {
        const fcred = await creds.findById(req.params.id);
        res.status(200).json({
            status : "Success",
            data : {
                fcred
            }
        });
    } catch (err) {
        res.status(400).json({
            status : "Fail",
            message : err
        })
    }
}

exports.updateCred = async (req,res) => {
    try {
        const upcred = await creds.findByIdAndUpdate(req.params.id, req.body, {
            new : true,
            runValidators: true
        });
        res.status(200).json({
            status : "Success",
            message : "Updated the Cred Succesfully",
            data : upcred
        });
    } catch (err) {
        res.status(400).json({
            status : "Fail",
            message : err
        })
    }
};

exports.deleteCred = async (req,res) => {
    try {
        const deltour = await creds.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status : "Success",
            data : null
        });
    } catch (err) {
        res.status(400).json({
            status : "Fail",
            message : err
        });
    };
};
