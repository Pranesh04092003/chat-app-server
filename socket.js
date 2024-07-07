const jwt = require('jsonwebtoken');
const { Server } = require('socket.io');
const Message = require('./models/Message'); 
const JWT_SECRET = process.env.JWT_SECRET; 

function socketServer(server) {
    const io = new Server(server, {
        cors: {
            origin: '*',
        },
    });

    io.use((socket, next) => {
        if (socket.handshake.query && socket.handshake.query.token) {
            jwt.verify(socket.handshake.query.token, JWT_SECRET, (err, decoded) => {
                if (err) return next(new Error('Authentication error'));
                socket.decoded = decoded;
                next();
            });
        } else {
            next(new Error('Authentication error'));
        }
    }).on('connection', (socket) => {
        console.log('User connected:', socket.decoded.username);

        socket.on('message', async (data) => {
            const { message, receiver } = data;
            const newMessage = new Message({
                sender: socket.decoded.username,
                receiver,
                message,
            });
            await newMessage.save();
            io.emit('message', newMessage);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });

    return io;
}

module.exports = socketServer;

