const mongoose = require("mongoose");

const Links = new mongoose.Schema({
    sponsoredLink: { type: String, required: true, unique: true },
    backlinks: [
        {
            type: String,
            required: true
        },
    ]
},
    {
        collection: 'link-data'
    }

)

const model = mongoose.model('LinkData', Links);

module.exports = model;