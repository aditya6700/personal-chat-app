const express = require('express');
const routes = require('./src/routes/routes');

const app = express();
const PORT = 1432 || process.env.PORT;

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('home page');
});

app.use('/api',routes);

app.listen(PORT, () => {
    console.log(`Listening on port : ${PORT}`);
});