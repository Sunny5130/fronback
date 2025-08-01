const User = require('../models/user');

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({ name, email, password });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully', success: true });
    } catch (err) {
        console.error('Signup Error:', err);
        res.status(500).json({ message: 'Signup failed', error: err.message });
    }
};

module.exports = { signup };
