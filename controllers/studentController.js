const Message = require('../models/Message');

async function fetchMessagedStudents(req, res) {
    try {
        const { username } = req.user; // Logged-in (expert's) username

        // Find all unique students who have messaged this expert
        const messages = await Message.find({ receiver: username }).distinct('sender');
        res.json(messages);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching students');
    }
}

module.exports = {
    fetchMessagedStudents,
};
