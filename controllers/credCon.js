const creds = require('../models/credModel');

exports.getAllCreds = async (req,res) => {
    try {
        const queryObj = req.query;
        let querystr = JSON.stringify(queryObj);
        querystr = querystr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        let query =  creds.find(JSON.parse(querystr));

        // Pagination
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 100;
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);

        if (req.query.page) {
            const credCount = await creds.countDocuments();
            if (skip >= credCount) throw new Error('This page does not exist');
        }

        const findcred = await query;
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
