const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const MessageController = require('../controllers/messageController');
const StudentController = require('../controllers/studentController'); 
const { authenticateToken } = require('../utils/auth');

// Register endpoint
router.post("/register", UserController.register);

// Login endpoint
router.post("/login", UserController.login);

// Fetch available experts endpoint
router.get("/experts", UserController.getExperts);

//Change user role endpoint
router.put("/user/rolechange", authenticateToken, UserController.updateUserRole);

// Fetch messages endpoint
router.get("/messages", authenticateToken, MessageController.fetchMessages);

// Fetch messages for selected student endpoint
router.get("/messages/student", authenticateToken, MessageController.fetchStudentMessages);

// Fetch students who messaged the logged-in expert endpoint
router.get("/students/messaged", authenticateToken, StudentController.fetchMessagedStudents);



module.exports = router;
