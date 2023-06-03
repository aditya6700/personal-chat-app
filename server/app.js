const dotenv = require('dotenv');
const express = require('express');
const routes = require('./src/routes/routes');

dotenv.config({ path: './config.env' }); // configuring env file
require('./src/db/conn'); // connecting to the database

// setting up express and port
const app = express();
const PORT = 1432 || process.env.PORT;

// parsing incoming requesting into json
app.use(express.json());

// home page
app.get('/', (req, res) => {
    res.status(200).send('home page');
});

// defining all user routes with /api/user
app.use('/api/user', routes);


// undefined routes for get and post
app.get('*', (req, res) => {
    res.status(404).send('undefined get request');
});
app.post('*', (req, res) => {
    res.status(404).send('undefined post request');
});


// setting up server to listen on a port
app.listen(PORT, () => {
    console.log(`Listening on port : ${PORT}`);
});