const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require("passport");

//KAYIT OL
router.post("/register", async (req, res) => {
    
    try{
        //yeni şifre oluşturma
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // yeni üye oluşturma
        const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
    });

        //Üyeyi kaydetme ve cevap
        const user = await newUser.save();
        res.status(200).json(user);
    } catch(err){
        res.status(500).json(err)
    }
});

//Giriş yap
router.post("/login", async (req, res)=> {
    try {
        const user = await User.findOne({email:req.body.email});
        !user && res.status(404).send("Kullanıcı yok")

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json("Şifre yanlış")

        res.status(200).json(user)
        } catch(err) {
            res.status(500).json(err)
    }
});

router.get("/login/failed", (req, res)=>{
    res.status(401).json({
        success: false,
        message: "Girilemedi",
    });
});

router.get("/login/success", (req, res)=>{
    if(req.user){
        res.status(200).json({
            success: true,
            message: "Giriş başarılı",
            user: req.user,
        });
    }
});

router.get("/google", passport.authenticate("google", {scope:["profile"]}));

router.get("/google/callback", passport.authenticate("google",{
    successRedirect: "http://localhost:3000/",
    failureRedirect: "/login/failed"
}))

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("http://localhost:3000/");
});//google için

module.exports = router;