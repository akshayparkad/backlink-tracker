const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const linkRoutes = require('./routes/links');
require('dotenv').config();


app.use(cors({ origin: '*' }));

mongoose.connect(process.env.MONGO_DB_URL);

// Handle preflight requests
app.options('*', cors());

//convert to json
app.use(express.json());

app.use(authRoutes);
app.use(linkRoutes);


const port = process.env.PORT
app.listen(port, () => {
    console.log('Server Started on port ' + port);
})