const express = require('express');

const app = express();

// Drill 1
app.get('/sum', (req, res) => {
    const { a, b } = req.query;

    // Validation - a and b are required and should be numbers
    if (!a) {
        return res
            .status(400)
            .send('a is required');
    }

    if (!b) {
        return res
            .status(400)
            .send('b is required');
    }

    const numA = parseFloat(a);
    const numB = parseFloat(b);

    if (Number.isNaN(numA)) {
        return res
            .status(400)
            .send('a must be a number');
    }

    if (Number.isNaN(numB)) {
        return res
            .status(400)
            .send('b must be a number');
    }


    const c = numA + numB;


    const responseString = `The sum of ${numA} and ${numB} is ${c}`;


    res
        .status(200)
        .send(responseString);
});

app.listen(8000, () => {
    console.log('Express server is listening on port 8000!');
});

//Drill 2

app.get('/cipher', (req, res) => {
    const { text, shift } = req.query;

    if (!text) {
        return res
            .status(400)
            .send('text not provided');
    }

    const shiftValue = parseInt(shift)

    if (Number.isNaN(shiftValue)) {
        return res
            .status(400)
            .send('shift must be a number');
    }

    const result = text.split('')
        .map(char => String.fromCharCode(char.charCodeAt(0) + shiftValue))
        .join('')

    res
        .status(200)
        .send(result);
})