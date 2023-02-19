const express = require("express");
const router = express.Router();
const LoginService = require("../Service/login.service.js");
const LoginServiceNew =require( "../Service/new.login.js");
const Linkedin=require("../Controllers/LinkedIn");
const Twitter=require("../Controllers/Twitter")
const Facebook=require('../Controllers/Facebook');
const Instagram=require('../Controllers/Instagram');
var auth = require('../Service/auth');

router.post('/Signin', LoginService.Login);
router.post('/Signup', LoginService.Signup);
router.post('/VerifyCode', LoginService.VerifyCode);
router.post('/NewPassward', LoginService.NewPassward);
router.post('/ForgotPassward', LoginService.ForgetPassward);


router.post('/UpdateAccount',auth,LoginService.UpdateAccount);




router.post('/Post_To_All_SocialMedia_Scheduling',auth, LoginService.Post_To_All_SocialMedia_Scheduling)
router.post('/Post_To_All_SocialMedia_Immediatly',auth, LoginService.Post_To_All_SocialMedia_Immidiatly);
router.post('/Show_All_Post',auth, LoginService.Show_All_Post);
router.post('/Show_Scheduled_Post',auth, LoginService.Show_Scheduled_Post);
router.post('/Show_Live_Post',auth, LoginService.Show_Live_Post);





// router.post('/Facebook/Create',auth,LoginService.CreateFacebookPost);
// router.post('/Instagram/Create',auth,LoginService.CreateInstagramPost);

// router.post('/Twiter/Create',auth,LoginService.CreateTweeterPost);
// only used in testing purpose


// ----------->>>>>>>><<<<<<<<<------------------//


router.post('/AddNewBrand',LoginServiceNew.AddNewBrand);
router.post('/ShowAllBrands',LoginServiceNew.ShowAllBrands);

router.post('/GetAuthLink/Linkedin',Linkedin.GetAuthLink);
router.get('/LinkedIn/callback',Linkedin.Callback);

router.get('/GetAuthLink/Twitter',Twitter.GetAuthLink);
router.get('/twitter/callback',Twitter.Callback);

router.post('/AddApikeysandTokenFacebook',Facebook.AddApikeysandTokenFacebook );
router.post('/AddApikeysandTokenInstagram', Instagram.AddApikeysandTokenInstagram);
module.exports = router;