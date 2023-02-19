const Brand = require("../Database/Model/Brand");

module.exports.AddNewBrand = async (req, res) => {
    // Image userid name

    console.log(req.body);
    if (req.body.name && req.body.userid && req.body.userid.match(/^[0-9a-fA-F]{24}$/)) {
        var Image = 'https://kaushik.onrender.com/image/' + req.file.filename;
        var name = req.body.name;
        var userid = req.body.userid;
        var newbrand = new Brand({

            userid: userid,
            name: name,
            facebookcredential: [],
            instagramid: "",
            instagramtoken: "",
            twitterid: "",
            twittertoken: "",
            linkedinid: "",
            linkedintoken: "",
            image: Image

        });

        var data = await newbrand.save();
        if (data) {

            res.json({status: 1, mag: "Saved Succesfully"})
        } else {
            res.json({status: 0, msg: "error with saving"})
        }
    } else {

        res.json({status: 0, mag: "Give Valid Credentials"})
    }

};

module.exports.ShowAllBrands = async (req, res) => {
    if (req.body.userid && req.body.userid.match(/^[0-9a-fA-F]{24}$/)) {
      Brand.find({
            userid: req.body.userid
        }, function (err, result) {

            if (!err) {
                res.json({status: 1, data: result});

            } else {
                res.send("internal server error");
            }
        })
    } else {
        res.json({status: 0, msg: "Please enter Valid Credentials"})
    }

}



