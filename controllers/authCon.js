const user = require('../models/authModel');
const bcrypt = require('bcryptjs');

exports.registerUser = async (req,res) => {
    try {
        const { username, email, password } = req.body;
        // Generate salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new user({
            username,
            email,
            password: hashedPassword
        });
        const savedUser = await newUser.save();
        res.status(201).json({
            status: 'Success',
            message: 'User registered successfully',
            data: {
            user: savedUser
            }
        });
    }catch (err) {
        res.status(400).json({
            status : "Fail",
            message : err
        });
    }
};

exports.userLogin = async (req, res) => {
    try {
        const { username, password, email } = req.body; // Ensure email is destructured here
        // Find the user by username or email
        const foundUser = await user.findOne({ $or: [{ username }, { email }] });
        // Check if user exists
        if (!foundUser) {
            return res.status(404).json({
                status: 'Fail',
                message: 'User not found',
            });
        }
        // Compare the provided password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, foundUser.password);
        // Check if password is valid
        if (!isPasswordValid) {
            return res.status(401).json({
                status: 'Fail',
                message: 'Invalid password',
            });
        }
        res.status(200).json({
            status: 'Success',
            message: 'User logged in successfully',
            data: {
                user: foundUser,
            },
        });
    } catch (err) {
        res.status(500).json({
            status: 'Fail',
            message: err.message || 'An unknown error occurred'
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

exports.getUserById = async (req,res) => {
    try {
        const getuserbyid = await user.findById(req.params.id);
        res.status(200).json({
            status : "Success",
            message : "User Suceesfully Retrieved",
            data : {
                user : getuserbyid
            }
        });
    }catch (err) {
        res.status(404).json({
            status : "Fail",
            message : err
        });
    };
};

exports.updateUser  = async (req,res) => {
    try {
        const updateuser = await user.findByIdAndUpdate(req.params.id, req.body, {
            new : true, 
            runValidators:true
        });
        res.status(200).json({
            status : "Success",
            message : "Updated Successfully",
            data : {
                data : updateuser
            }
        });
    }catch (err) {
        res.status(404).json({
            status : "Fail",
            message : err
    });
}
};

exports.deleteUser = async (req,res) => {
    try {
        const getuserbyid = await user.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status : "Success",
            message : "User Suceesfully Deleted",
            data :null
        });
    }catch (err) {
        res.status(404).json({
            status : "Fail",
            message : err
        });
    };
};