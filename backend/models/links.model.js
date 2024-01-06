const mongoose = require("mongoose");

const Links = new mongoose.Schema({
    sponsoredLink: { type: String, required: true, unique: true },
    backlinks: [
        {
            type: String,
            required: true
        },
    ],
      // Reference to User model
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'UserData' }
},
    {
        collection: 'link-data'
    }

)

const model = mongoose.model('LinkData', Links);

module.exports = model;