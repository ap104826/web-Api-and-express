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

//Drill 3

app.get('/lotto', (req, res) => {
    const { numbers } = req.query;

    const decodedNumbers = decodeURIComponent(numbers)
    const jsonNumbers = JSON.parse(decodedNumbers)

    const lotteryNumbers = [3, 5, 6, 1, 7, 9]

    const results = lotteryNumbers.map((number, index) => number === jsonNumbers.arr[index])

    if (results.filter((result) => result === true).length < 4) {
        res
            .status(200)
            .send("Sorry, you lose")
    }

    if(results.filter((result) => result === true).length === 6){
        res
            .status(200)
            .send("Congratulations, you win a free ticket")
    }


})
