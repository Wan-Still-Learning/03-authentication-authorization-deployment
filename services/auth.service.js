const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/auth.model');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const BCRYPT_COST_FACTOR = process.env.BCRYPT_COST_FACTOR;

async function register(name, email, password) {
    const hashedPassword = await bcrypt.hash(password, BCRYPT_COST_FACTOR);
    const newUser = await User.create({ name, email, password: hashedPassword });
    return newUser;
}

async function login(email, password) {
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    return { token, user };
}

async function getProfile(userId) {
    const user = await User.findById(userId).select('-password'); // Exclude password from response
    if (!user) throw new Error('User not found');
    return user;
}

function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
}

module.exports = { register, login, verifyToken, getProfile };