const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const db = require('./config/database');

const app = express();
const server = http.createServer(app);

const io = socketIo(server, { cors: { origin: "*", methods: ["GET", "POST"] } });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/questions', require('./routes/questions'));
app.use('/api/games', require('./routes/games'));
app.use('/api/users', require('./routes/users'));
app.use('/api/scores', require('./routes/scores'));

io.on('connection', (socket) => {
    console.log('New user connected:', socket.id);

    socket.on('join_game', (data) => {
        socket.join(`game_${data.gameId}`);
        io.to(`game_${data.gameId}`).emit('player_joined', { playerId: socket.id, playerName: data.playerName });
    });

    socket.on('submit_answer', (data) => {
        io.to(`game_${data.gameId}`).emit('answer_submitted', { playerId: socket.id, questionId: data.questionId, answer: data.answer });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
