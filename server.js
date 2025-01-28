const express = require('express');
const app = express();

function getNumbersFromQuery(query) {
    if (!query) {
        throw new Error('Please provide a "numbers" query parameter.');
    }

    const numbers = query.split(',').map(Number);
    if (numbers.some(isNaN)) {
        throw new Error('All inputs must be valid numbers.');
    }

    return numbers;
}

app.get('/add', (req, res) => {
    try {
        const numbers = getNumbersFromQuery(req.query.numbers);
        const total = numbers.reduce((sum, number) => sum + number, 0);
        res.json({ result: total });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/sub', (req, res) => {
    try {
        const numbers = getNumbersFromQuery(req.query.numbers);
        const difference = numbers.reduce((result, number) => result - number);
        res.json({ result: difference });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/mult', (req, res) => {
    try {
        const numbers = getNumbersFromQuery(req.query.numbers);
        const product = numbers.reduce((result, number) => result * number, 1);
        res.json({ result: product });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/div', (req, res) => {
    try {
        const numbers = getNumbersFromQuery(req.query.numbers);
        if (numbers.slice(1).includes(0)) {
            throw new Error('Cannot divide by zero.');
        }
        const quotient = numbers.reduce((result, number) => result / number);
        res.json({ result: quotient });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/pow', (req, res) => {
    try {
        const numbers = getNumbersFromQuery(req.query.numbers);
        const result = numbers.reduce((current, number) => Math.pow(current, number));
        res.json({ result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/root', (req, res) => {
    try {
        const numbers = getNumbersFromQuery(req.query.numbers);
        if (numbers.length !== 2) {
            throw new Error('Root operation requires exactly two numbers.');
        }

        const [degree, value] = numbers;
        if (degree <= 0) {
            throw new Error('The root degree must be greater than zero.');
        }

        const result = Math.pow(value, 1 / degree);
        res.json({ result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
