const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const JWT_SECRET = process.env.JWT_SECRET;

// Register
async function register(req, res) {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).send("User registered");
    } catch (err) {
        console.error(err);
        res.status(400).send("User registration failed");
    }
}

//Login
async function login(req, res) {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { username: user.username, role: user.role },
                JWT_SECRET
            );
            res.json({ token });
        } else {
            res.status(401).send("Invalid credentials");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
}


//Admin update the Roles
async function updateUserRole(req, res) {
    const { role, username } = req.body;

    try {
        // Check if the authenticated user is an admin
        if (req.user.role !== 'admin') {
            return res.sendStatus(403); // Forbidden if not admin
        }

        // Check if the username exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Update the user's role
        user.role = role;
        await user.save();

        res.send('Role updated');
    } catch (err) {
        console.error(err);
        res.status(400).send('Role update failed');
    }
}

//Available Experts
async function getExperts(req, res) {
    try {
        const users = await User.find({ role: 'expert' });
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching experts');
    }
}


module.exports = {
    register,
    login,
    getExperts,
    updateUserRole
};
