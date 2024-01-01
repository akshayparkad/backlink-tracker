const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user.model')
const Links = require('./models/links.model')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const axios = require("axios")


mongoose.connect('mongodb+srv://backlink-tracker-user:dlHzRUdjGe7hGTrg@cluster0.by6a6y1.mongodb.net/?retryWrites=true&w=majority');

app.use(cors());
app.use(express.json());    

//add links to pool
app.post('/api/addLinks', async(req,res)=>{

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
            res.status(400).json({ status: 'error', message: 'Duplicate key error' });
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


    const user = await User.findOne({ email: req.body.email});

    if(!user){
        return res.json({ status: 'error', error: 'Invalid Login' })
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

    if (isPasswordValid) {

        const token = jwt.sign({
            name: req.body.name,
            email: req.body.email,
        }, 'secret123', { expiresIn: '24h' })

        return res.json({ status: 'ok', user: {token, name: user.name} });
    } else {
        return res.json({ status: 'error', user: false })
    }
})

app.get('/api/verify', (req, res)=>{

    const token = req.headers.authorization;

    if(!token){
        res.json({ status: 'error' });
    }

    jwt.verify(token, 'secret123', (err, decoded) => {
        if (err) {
          return res.json({status: 'error', error: 'Invalid token' });
        }

        return res.json({ status: 'ok' });
  });
})

app.listen(8000, () => {
    console.log('Server Started on port ' + 8000);
})