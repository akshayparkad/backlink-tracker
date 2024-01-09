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
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'UserData', required: true }
},
    {
        collection: 'link-data'
    }

)

// Create a compound unique index on sponsoredLink and user
Links.index({ sponsoredLink: 1, user: 1 }, { unique: true });

const model = mongoose.model('LinkData', Links);

module.exports = model;