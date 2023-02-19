var mong = require("../Connection");

const crypto = require("crypto");
const Brandschema = new mong.Schema({

    userid: String,
    name: String,
    facebookcredential: {
        type: Map,
        of: String
    },
    instagramcredential: {
        type: Map,
        of: String
    },
    twitterid: String,
    twittertoken: String,
    linkedinid: String,
    linkedintoken: String,
    image: String

})

const Brands = mong.model("postagerbrand", Brandschema);
module.exports = Brands