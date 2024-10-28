const User = require('../models/User'); // Your User model

const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user' });
    }
};

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        res.status(200).json({ message: 'User logged in successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in user' });
    }
};

module.exports = {
    registerUser,
    loginUser,
};
