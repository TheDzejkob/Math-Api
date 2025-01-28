// server.js
const express = require('express');
const app = express();

// Helper function to parse numbers from query
const parseNumbers = (query) => {
    if (!query) {
        throw new Error('Missing "numbers" query parameter.');
    }

    const numbers = query.split(',').map(Number);
    if (numbers.some(isNaN)) {
        throw new Error('Invalid input. All values must be numbers.');
    }

    return numbers;
};

// Routes for each mathematical operation
app.get('/add', (req, res) => {
    try {
        const numbers = parseNumbers(req.query.numbers);
        const result = numbers.reduce((sum, num) => sum + num, 0);
        res.json({ result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/sub', (req, res) => {
    try {
        const numbers = parseNumbers(req.query.numbers);
        const result = numbers.reduce((diff, num) => diff - num);
        res.json({ result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/mult', (req, res) => {
    try {
        const numbers = parseNumbers(req.query.numbers);
        const result = numbers.reduce((product, num) => product * num, 1);
        res.json({ result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/div', (req, res) => {
    try {
        const numbers = parseNumbers(req.query.numbers);
        if (numbers.slice(1).includes(0)) {
            throw new Error('Division by zero is not allowed.');
        }
        const result = numbers.reduce((quotient, num) => quotient / num);
        res.json({ result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/pow', (req, res) => {
    try {
        const numbers = parseNumbers(req.query.numbers);
        const result = numbers.reduce((power, num) => Math.pow(power, num));
        res.json({ result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/root', (req, res) => {
    try {
        const numbers = parseNumbers(req.query.numbers);
        if (numbers.length !== 2) {
            throw new Error('Root operation requires exactly two numbers.');
        }
        const [degree, radicand] = numbers;
        if (degree <= 0) {
            throw new Error('Degree of the root must be greater than zero.');
        }
        const result = Math.pow(radicand, 1 / degree);
        res.json({ result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
