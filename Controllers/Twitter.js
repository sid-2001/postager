const oauth = require('oauth')
const oauthConsumer = new oauth.OAuth(
    'https://twitter.com/oauth/request_token', 'https://twitter.com/oauth/access_token',
    process.env.TWITTER_CONSUMER_API_KEY,
   process.env.TWITTER_CONSUMER_API_SECRET_KEY,
    '1.0A','http://127.0.0.1:4000/api/v1/twitter/callback', 'HMAC-SHA1')

    async function oauthGetUserById (userId, { oauthAccessToken, oauthAccessTokenSecret } = {}) {
        return promisify(oauthConsumer.get.bind(oauthConsumer))(`https://api.twitter.com/1.1/users/show.json?user_id=${userId}`, oauthAccessToken, oauthAccessTokenSecret)
          .then(body => JSON.parse(body))
      }
      async function getOAuthAccessTokenWith ({ oauthRequestToken, oauthRequestTokenSecret, oauthVerifier } = {}) {
        return new Promise((resolve, reject) => {
          oauthConsumer.getOAuthAccessToken(oauthRequestToken, oauthRequestTokenSecret, oauthVerifier, function (error, oauthAccessToken, oauthAccessTokenSecret, results) {
            return error
              ? reject(new Error('Error getting OAuth access token'))
              : resolve({ oauthAccessToken, oauthAccessTokenSecret, results })
          })
        })
      }
      async function getOAuthRequestToken () {
        return new Promise((resolve, reject) => {
          oauthConsumer.getOAuthRequestToken(function (error, oauthRequestToken, oauthRequestTokenSecret, results) {
            return error
              ? reject(new Error('Error getting OAuth request token'))
              : resolve({ oauthRequestToken, oauthRequestTokenSecret, results })
          })
        })
      }
      
exports.GetAuthLink=async (req, res) => {
const method="authorize";
    req.session.brandid=req.body.brandid;

    console.log(`/twitter/${method}`)
    const { oauthRequestToken, oauthRequestTokenSecret } = await getOAuthRequestToken()
    console.log(`/twitter/${method} ->`, { oauthRequestToken, oauthRequestTokenSecret })

    req.session = req.session || {}
   
    req.session.oauthRequestToken = oauthRequestToken
    req.session.oauthRequestTokenSecret = oauthRequestTokenSecret

    const authorizationUrl = `https://api.twitter.com/oauth/${method}?oauth_token=${oauthRequestToken}`
    console.log('redirecting user to ', authorizationUrl)
    res.send(authorizationUrl)
  }
exports.Callback=async (req, res) => {
    const { oauthRequestToken, oauthRequestTokenSecret} = req.session
    console.log("the requested query is"+JSON.stringify(req.query));
    const { oauth_verifier: oauthVerifier } = req.query
    console.log('/twitter/callback', { oauthRequestToken, oauthRequestTokenSecret, oauthVerifier })
if(req.session.oauthAccessToken){



    const { oauthAccessToken, oauthAccessTokenSecret, results } = await getOAuthAccessTokenWith({ oauthRequestToken, oauthRequestTokenSecret, oauthVerifier })
    req.session.oauthAccessToken = oauthAccessToken
    req.session.oauthAccessTokenSecret=oauthAccessTokenSecret;
    console.log("the acess token is"+oauthAccessToken);
    console.log("the acess token secret is"+oauthAccessTokenSecret);
    console.log(kaushikdata);
    res.cookie('acesstoken', oauthAccessToken, { maxAge: 900000, httpOnly: true })
    res.cookie('acesstokensecret', oauthAccessTokenSecret, { maxAge: 900000, httpOnly: true })
     
    const { user_id: userId /*, screen_name */ } = results


    const user = await oauthGetUserById(userId, { oauthAccessToken, oauthAccessTokenSecret })
 
    // req.session.twitter_screen_name = user.screen_name
    res.cookie('twitter_screen_name', user.screen_name, { maxAge: 900000, httpOnly: true })
    
    console.log('user succesfully logged in with twitter', user.screen_name)
    req.session.save(() => res.redirect('/'))
}
else{

    res.json({
        status:0,
        mag:"error"
    })
}
  }

exports.PublishTwitter=async(req,res)=>{

        console.log(req.body);
        var client = new Twitter({
          consumer_key: process.env.TWITTER_CONSUMER_API_KEY,
          consumer_secret:  process.env.TWITTER_CONSUMER_API_SECRET_KEY,
          access_token_key: req.body.accestoken,
          access_token_secret: req.body.accestokensecret
        });
    
    
     var data = await client.post('statuses/update', {status: req.body.content},  function(error, tweet, response) {
          if(error) {
    
            res.send(error)
          };
          // return tweet;
          console.log("the tweet is "+tweet.id);
          res.send("ok"); // Tweet body.
            // Raw response object.
        });
    
       
    
    
    
}