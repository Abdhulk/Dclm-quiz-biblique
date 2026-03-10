const express = require('express');
const router = express.Router();

// Mock database for questions
let questions = [];

// Create a new question
router.post('/', (req, res) => {
    const question = req.body;
    questions.push(question);
    res.status(201).send(question);
});

// Read all questions
router.get('/', (req, res) => {
    res.send(questions);
});

// Read a single question by ID
router.get('/:id', (req, res) => {
    const question = questions.find(q => q.id === parseInt(req.params.id));
    if (!question) return res.status(404).send('Question not found');
    res.send(question);
});

// Update a question by ID
router.put('/:id', (req, res) => {
    const question = questions.find(q => q.id === parseInt(req.params.id));
    if (!question) return res.status(404).send('Question not found');

    Object.assign(question, req.body);
    res.send(question);
});

// Delete a question by ID
router.delete('/:id', (req, res) => {
    const questionIndex = questions.findIndex(q => q.id === parseInt(req.params.id));
    if (questionIndex === -1) return res.status(404).send('Question not found');

    questions.splice(questionIndex, 1);
    res.status(204).send();
});

module.exports = router;