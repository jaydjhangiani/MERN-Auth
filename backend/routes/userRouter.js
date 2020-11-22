const router = require("express").Router();
const User = require("../models/userModel");
const jwt =require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const auth = require("../middleware/auth")
/* TEST 
router.get("/test",(req,res) => {
    res.send("HELLO0!!!")
});
*/

router.post("/register", async (req,res) => {
    try{
        let {email,password,passwordCheck,displayName} = req.body;

        //validate

        if( !email || !password || !passwordCheck){
            return res.status(400).json({
                msg: "Not all fields entered"
            });
        }
        if(password.length < 5){
            return res.status(400).json({
                msg: "Atleast 5 characters"
            });
        }
        if(password !== passwordCheck){
            return res.status(400).json({
                msg: "mismatch"
            });
        }

        const existingUser  = await User.findOne({email: email})
        if(existingUser){
            return res
                .status(400)
                .json({msg: "An account with us already exists."});
        }

        if(!displayName){
            displayName = email
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password,salt);

        //console.log(passwordHash)

        const newUser = new User({
            email,
            password:passwordHash,
            displayName 
        });

        const savedUser = await newUser.save();
        res.json(savedUser);
        
    }
    catch(err){
        res.status(500).json({error: err.message});
    }

});

router.post("/login", async (req,res) => {
    try{
        const {email,password} = req.body;

        //validate
        if(!email || !password){
            return res.status(400).json({msg:"Not entered"});
        }

        const user = await User.findOne({email: email})
        if(!user){
            return res.status(400).json({msg:"No account registered "});
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({msg:"Incorrect Credentials "});
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        console.log(token);
        res.json({
            token,
            user:{
                id: user._id,
                displayName: user.displayName,
                email: user.email,
            }
        })
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
})

router.delete("/delete", auth, async (req,res) => {
    try{
        const deleteUser = await User.findByIdAndDelete(req.user)
        res.json(deleteUser)
    }
    catch(err){
        return res.status(500).json({error: err.message});
    }
});

router.post("/tokenIsValid",async (req,res) => {
    try{
        const token = req.header("x-auth-token");
        if(!token){
            return res.json(false);
        }
        const verified = jwt.verify(token,process.env.JWT_SECRET);
     
        if(!verified){
            return res.status(401).json(false);
        }

        const user = await User.findById(verified.id);
        if(!user){
            return res.status(401).json(false);
        }

        return res.json(true);
    }
    catch(err){
        return res.status(500).json({error: err.message});
    }
});

router.get('/', auth, async (req,res) => {
    const user = await User.findById(req.user)
    res.json({
        displayName: user.displayName,
        id: user._id
    });
});

module.exports = router;