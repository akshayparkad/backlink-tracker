const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user.model')
const Links = require('./models/links.model')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const axios = require("axios")

require('dotenv').config();

mongoose.connect(process.env.MONGO_DB_URL);


app.use(cors());
app.use(express.json());


app.post('/api/checkAvailability', async (req, res) => {

    try {
        const url_to_scrap = req.body.sponsoredLink;

        //get backlinks
        const backlinks_to_search = req.body.backlinks;

        if (!backlinks_to_search || !Array.isArray(backlinks_to_search) || backlinks_to_search.length === 0) {
            return res.status(400).json({ error: 'Invalid or missing keywords in the request body' });
        }

        console.log(backlinks_to_search);

        //scrapped data
        const { data } = await axios.get(url_to_scrap);

        // Array to store results
        const results = [];


        // Loop through each keyword
        backlinks_to_search.forEach(keyword => {
            // Check if the keyword exists in the raw HTML
            if (data.includes(keyword)) {
              results.push({
                keyword,
                found: true,
              });
            } else {
              results.push({
                keyword,
                found: false,
              });
            }
          });
            
        res.json(results);

    } catch (error) {

        res.status(500).json({ error: 'Internal Server Error' });
    }


})


//add links to pool
app.post('/api/addLinks', async (req, res) => {

    console.log(req.body);

    try {
        await Links.create({

            sponsoredLink: req.body.sponsoredLink,
            backlinks: req.body.backlinks
        })

        res.json({ status: 'ok' })

    } catch (err) {

        console.log(err);

        if (err.code === 11000 || err.code === 11001) {
            // MongoDB duplicate key error
            res.status(400).json({ status: 'error', message: 'Duplicate link is not allowed' });
        } else {
            // Other errors
            res.status(500).json({ status: 'error', message: 'Internal server error' });
        }
    }
})


//get all links

app.get('/api/links', async (req, res) => {

    try {
        const allLinks = await Links.find();

        res.json(allLinks);

    } catch (error) {

        res.status(500).json({ error: 'Internal Server Error' });

    }
});

//delete link from the pool

app.delete('/api/links/:id', async (req, res) => {

    try {

        const linkId = req.params.id;

        const deletedLink = await Links.findByIdAndDelete(linkId);

        if (!deletedLink) {

            return res.status(404).json({ error: 'Link not found' });
        }

        res.json({ message: 'Link deleted successfully' });

    } catch (error) {

        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.post('/api/register', async (req, res) => {

    try {

        const cryptedPassword = await bcrypt.hash(req.body.password, 10);

        await User.create({

            name: req.body.name,
            email: req.body.email,
            password: cryptedPassword
        })

        res.json({ status: 'ok' })

    } catch (err) {

        res.json({ status: 'error' })
    }

})


app.post('/api/login', async (req, res) => {
    console.log(req.body);


    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return res.json({ status: 'error', error: 'Invalid Login' })
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

    if (isPasswordValid) {

        const token = jwt.sign({
            name: req.body.name,
            email: req.body.email,
        }, 'secret123', { expiresIn: '24h' })

        return res.json({ status: 'ok', user: { token, name: user.name } });
    } else {
        return res.json({ status: 'error', user: false })
    }
})

app.get('/api/verify', (req, res) => {

    const token = req.headers.authorization;

    if (!token) {
        res.json({ status: 'error' });
    }

    jwt.verify(token, 'secret123', (err, decoded) => {
        if (err) {
            return res.json({ status: 'error', error: 'Invalid token' });
        }

        return res.json({ status: 'ok' });
    });
})

app.listen(8000, () => {
    console.log('Server Started on port ' + 8000);
})