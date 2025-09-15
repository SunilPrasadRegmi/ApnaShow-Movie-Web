import { validationResult } from "express-validator";
import userModel from "../../models/user.model.js";

export const getProfileController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        // Find user
        const user = await userModel.findById(req.user._id).select('-password');
        if (!user) {
            return res.status(404).json({  success: false, message: 'User not found' });
        }
        //send response
        res.json({ success: true, data: user });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ success: false, message: 'Server error while fetching profile' });
    }

}

export const updateDetails = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    try{
        const {name, email, phone} = req.body;

        if(!name || !email || !phone){
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        // Find user
        const user = await userModel.findById(req.user._id);
        if(!user){
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser && existingUser._id !== user._id) {
            return res.status(400).json({ success: false, message: 'Email already exists' });
        }

        // Update user details
        user.name = name;
        user.email = email;
        user.phone = phone;
        await user.save();

        //remove password

        delete user._doc.password;

        //send response
        res.status(200).json({ success: true, message: 'Details updated successfully', data: user});
    } catch(error) {
        res.status(500).json({ success: false, message: 'Server error while updating details', error: error.message });
    }
}

export const updatePassword = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const {newPassword, currentPassword} = req.body;

        if(!newPassword || !currentPassword){
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        // Find user
        const user = await userModel.findById(req.user._id).select('+password');
        if(!user){
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Check if current password is correct
        const isMatch = await user.isValidPassword(currentPassword);
        if(!isMatch){
            return res.status(400).json({ success: false, message: 'Current password is incorrect' });
        }

        const hashPassword = await userModel.hashPassword(newPassword);
        // set new password
        user.password = hashPassword;
        await user.save();

        delete user._doc.password;
        //send response
        res.status(200).json({ success: true, message: 'Password changed successfully', data: user});    
    } catch(error) {
        res.status(500).json({ success: false, message: 'Server error while updating password' });
    }
}