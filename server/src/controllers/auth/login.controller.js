import { validationResult } from 'express-validator';
import userModel from '../../models/user.model.js';

export const loginController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        const { phone,email, password } = req.body;

        if (!email && !phone) {
            return res.status(400).json({ message: 'all fields are required' });
        }

        if (!password) {
            return res.status(400).json({ message: 'all fields are required' });
        }
        
        // Check if user exists
        const user = await userModel.findOne({
            $or: [{ email }, { phone }],
        }).select('+password');
        
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        if (user.isDisabled) {
            return res.status(400).json({ message: 'Your account has been disabled. Please contact support.' });
        }

        // Check password is valid
        const isValidPassword = await user.isValidPassword(password);
        if (!isValidPassword) {
            return res.status(400).json({ message: 'Invalid credentialsp' });
        }

        // Generate token
        const token = user.generateToken();
        
        // Update last active
        user.lastActive = Date.now();
        await user.save();

        //remove password from response
        // user._doc.password = undefined;
        delete user._doc.password;

        //send response
        const successResponse = { message: 'User logged in successfully', success: true, user, token };
        return res.status(200).json(successResponse);
    } catch(error) {
        return res.status(500).json({ message: 'User logged in failed Please try again ', success: false, error: error.message || 'Server error' });
    }
}

export const logOutController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = await userModel.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }
        
        // Update last active
        user.lastActive = Date.now();
        await user.save();

        return res.status(200).json({ message: 'User logged out successfully', success: true });
    } catch (error) {
        return res.status(500).json({ message: 'User logged out failed Please try again ', success: false, error: error.message || 'Server error' });
    }
}