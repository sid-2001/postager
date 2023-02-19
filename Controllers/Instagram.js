const Brand = require('../Database/Model/Brand')
var axios = require('axios');
// const { resolve } = require('path');

async function getinstagramid(pageid, access_token) {
    var url = 'https://graph.facebook.com/v16.0/' + pageid + '?fields=instagram_bus' +
            'iness_account&access_token=' + access_token;
    const response = await axios.get(url);

    if (response.data.instagram_business_account) {
        return response.data.instagram_business_account.id

    } else {
        return null
    }

}

exports.AddApikeysandTokenInstagram = async (req, res) => {

    if (req.body._id && req.body.facebookid && req.body.oauth_token && req.body._id.match(/^[0-9a-fA-F]{24}$/)) {
        var url = 'https://graph.facebook.com/v3.2/oauth/access_token?grant_type=fb_exchange_toke' +
                'n&client_id=' + process.env.Facebook_Consumer_key + '&client_secret=' +
                process.env.Facebook_Consumer_Secret + '&fb_exchange_token=' + req.body.oauth_token;

        const response = await axios.get(url);

        console.log('the data is' + response.data);
        var longliveacesstoken = response.data.access_token;

        var lonnglivepagesurl = 'https://graph.facebook.com/v3.2/' + req.body.facebookid +
                '/accounts?access_token=' + longliveacesstoken;
        console.log(lonnglivepagesurl)
        const pagesdata = await axios
            .get(lonnglivepagesurl)
            .then();
        let map = new Map();

        await pagesdata
            .data
            .data
            .forEach(async function (item, index) {
                getinstagramid(item.id, item.access_token).then(function (value) {

                    var instagrampageid = value;
                    console.log("the instagramid is " + JSON.stringify(instagrampageid));
                    if (instagrampageid != null) {
                        map.set(instagrampageid, longliveacesstoken);
                    }

                    console.log(map)

                    Brand.updateOne({
                        "_id": req.body._id
                    }, {
                        'instagramcredential': map
                    }, function (error, responc) {
                        console.log(responc);
                        
                        // if (response.nModified == 1) {

                        //     res.json({Status: 1, msg: "updated succesfully"})
        
                        // } else {
                        //     res.json({Status: 0, msg: "Not Updated/Dont tyr to Overwrite"})
        
                        // }

                    });
                });

            });
            res.json({Status: 1, msg: "updated succesfully"})
    }
     else {

        res.json({status: 0, msg: "Send all Necessary Fields"})
    }

}