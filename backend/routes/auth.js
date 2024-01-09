const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const User = require('../models/user.model')
const express = require('express');

const router = express.Router();


const nameRegex = /^([a-z]+(-| )?)+$/i;
const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

router.post('/api/register', async (req, res) => {

    try {
        const { name, email, password } = req.body;

          // Input validation
          if (!name || !email || !password) {
            return res.status(400).json({ status: 'error', message: 'All fields are required' });
        }

        // Validate name format
        if (!nameRegex.test(name)) {
            return res.status(400).json({ status: 'error', message: 'Invalid name format' });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ status: 'error', message: 'Invalid email format' });
        }

        // Validate password strength
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                status: 'error',
                message: 'Password must contain at least one digit, one special character, one lowercase and one uppercase letter, and be at least 8 characters long'
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ status: 'error', message: 'Email is already registered' });
        }

        const cryptedPassword = await bcrypt.hash(req.body.password, 10);

        const defaultTotalCredits = process.env.DEFAULT_CREDITS;

        await User.create({

            name: req.body.name,
            email: req.body.email,
            password: cryptedPassword,
            total_credits: defaultTotalCredits
        })

        res.json({ status: 'ok' })  

    } catch (error) {

        // Handle specific errors
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ status: 'error', message: 'Email is already registered' });
        }

        return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }

})


router.post('/api/login', async (req, res) => {

    try {

        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ status: 'error', message: 'Email and password are required' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ status: 'error', message: 'Invalid credentials' });
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            const token = jwt.sign({
                userId: user._id,
                name: user.name,
                email: user.email,
                total_credits: user.total_credits,
            },  process.env.JWT_SECRET, { expiresIn: '1h' });

            return res.json({ status: 'ok', user: { token, name: user.name, email: user.email, total_credits: user.total_credits } });

        } else {
            return res.status(401).json({ status: 'error', message: 'Invalid credentials' });
        }

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
})

module.exports = router;
