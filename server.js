// Dependencies

const express = require('express');
const path = require('path');

// Sets up the Express App

const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Routes

// Basic route that sends the user first to the Home Page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'home.html')));
// Route that sends Reservation page
app.get('/reserve', (req, res) => res.sendFile(path.join(__dirname, 'reserve.html')));
//Route that sends to View Tables page
app.get('/tables', (req, res) => res.sendFile(path.join(__dirname, 'tables.html')));

// Displays all tables
app.get('/api/tables', (req, res) => res.json(tableArray));
// Displays waitlist
app.get('/api/waitlist', (req, res) => res.json(waitArray));

// Arrays


let resArray = [];
let tableArray = [];
let waitArray = [];
// Create New Reservation - takes in JSON input
app.post('/api/reservation', (req, res) => {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    const newReservation = req.body;
    console.log('new reservation', newReservation)
    resArray.push(newReservation);
    res.json(newReservation);


    tableArray = resArray.filter((reservation, index) => {
        return index <= 4;
    })

    waitArray = resArray.filter((waitlisted, index) => {
        return index > 4;
    })

});


app.delete('/api/reservation', (req, res) => {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    resArray = [];
    tableArray = [];
    waitArray = [];

});
// Starts the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
