import { validationResult } from 'express-validator';
import User from '../../models/user.model.js';

export const registerController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, email, password, phone } = req.body;

        if(!name || !email || !password || !phone) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashPassword = await User.hashPassword(password);
        
        // Create user
        const user = new User({ name, email, password:hashPassword, phone });
        await user.save();


        // Remove password from response
        delete user._doc.password
        
        // Generate token
        const token = user.generateToken();
        
        // Send response
        const successResponse = { message: 'User registered successfully', success: true, user, token };
        return res.status(201).json(successResponse);
    } catch(error) {
        return res.status(500).json({ message: 'User registration failed Please try again ', success: false, error: error.message || 'Server error' });
    }
}
