const Message = require('../models/Message');

async function fetchMessages(req, res) {
    try {
        const { username } = req.user; // Current logged-in user (Student)
        const { selectedExpert } = req.query; // Expert selected by the student

        const messages = await Message.find({
            $or: [
                { sender: username, receiver: selectedExpert },
                { sender: selectedExpert, receiver: username },
            ],
        }).sort({ createdAt: 'asc' });

        res.json(messages);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching messages');
    }
}

async function fetchStudentMessages(req, res) {
  try {
      const { username } = req.user; // Current logged-in user (expert)
      const { selectedStudent } = req.query; // Student selected by the expert

      const messages = await Message.find({
          $or: [
              { sender: username, receiver: selectedStudent },
              { sender: selectedStudent, receiver: username },
          ],
      }).sort({ createdAt: 'asc' });

      res.json(messages);
  } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching messages');
  }
}

module.exports = {
    fetchMessages,
    fetchStudentMessages
};
