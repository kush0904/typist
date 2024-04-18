const express = require('express');
const cred = require('./config/config');
const mongoose = require('mongoose');
const Results = require('./models/results');
const cors = require('cors');

const resultsRoute = require('./routes/resultsRoute');


const port = cred.PORT;
const MongoDBURL = cred.MongoDBURL;

const app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/results', resultsRoute);


mongoose.connect(MongoDBURL)
    .then(() => {
        console.log('Connected to MongoDB');

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
        
    })
    .catch((err) => {
        console.log('Error connecting to MongoDB', err);
    });
