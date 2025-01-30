const authService = require('../services/auth.service');

async function register(req, res) {
    try {
        const { name, email, password } = req.body;
        const user = await authService.register(name, email, password);
        res.status(201).json({ message: 'User registered', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const { token, user } = await authService.login(email, password);
        res.status(200).json({ message: 'Login successful', token, user });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}

async function getProfile(req, res) {
    try {
        const user = await authService.getProfile(req.user.id);
        res.status(200).json({ user });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

module.exports = { register, login, getProfile };
