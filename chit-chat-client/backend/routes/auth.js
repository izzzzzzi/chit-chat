const router = require("express").Router();
const passport = require("passport")

const CLIENT_URL = "http://localhost:3000/"

router.get("login/success", (req,res)=>{
  if(req.user){
    res.status(401).json({
    success: true, 
    message: "success",
    user : req.user,
    // cokies: req.cokies
  });
  }
});

router.get("login/failed", (req,res)=>{
  res.status(401).json({
    success: false, 
    message: "failure",
  });
});

router.get("/logout", (req,res)=>{
  req.logOut();
  res.redirect(CLIENT_URL);
});

router.get("/google", passport.authenticate("google", {scope: ["profile"]}));

router.get("/google/callback", 
  passport.authenticate("google", {
  successRedirect: CLIENT_URL,
  failureRedirect: "/login/failed"
}));

module.exports = router 