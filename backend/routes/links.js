
const express = require('express');
const Links = require('../models/links.model')
const axios = require("axios")
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();
const mongoose = require('mongoose');

// Validate if the provided ID is a valid MongoDB ObjectId
function isValidObjectId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}


router.post('/api/checkAvailability', verifyToken, async (req, res) => {

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
router.post('/api/addLinks', verifyToken,  async (req, res) => {

    console.log(req.body);

    const userId = req.user.userId;

    console.log("id- " + userId);

    try {
        await Links.create({

            sponsoredLink: req.body.sponsoredLink,
            backlinks: req.body.backlinks,
            user: userId  
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

router.get('/api/linkById', verifyToken, async (req, res) => {

    try {

        const userId = req.user.userId;
        
            console.log(userId);
        // Validate userId to ensure it's a valid ObjectId (assuming MongoDB ObjectId)
        if (!isValidObjectId(userId)) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }

        const links = await Links.find({ user: userId });

        if (!links || links.length === 0) {
            return res.status(404).json({ error: 'No links found for the specified user' });
        }

        res.json(links);

    } catch (error) {

        res.status(500).json({ error: 'Internal Server Error' });

    }
});

//delete link from the pool

router.delete('/api/links/:id', verifyToken, async (req, res) => {

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

module.exports = router;
