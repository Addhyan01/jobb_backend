const expess = require("express");
const router = expess.Router();
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

const { User } = require("../schema/user.schema");
//register an user 

router.post("/register", async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        // console.log(name, email, password, phone);
        const ifUserExist = await User.findOne({ email });
        const phoneExist = await User.findOne({ phone });
        if (ifUserExist) {
            return res.status(400).json({ message: "user already exist" });
        }
        if (phoneExist) {
            return res.status(400).json({ message: "phone number already exist" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password : hashedPassword, phone });
        await user.save();
        res.status(201).json({ message: "user registered successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "something went wrong" });
    }
})


router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jsonwebtoken.sign({ id: user._id }, "secret");
        res.status(200).json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "something went wrong" });
    }
})


router.get(("/"), async (req, res) => {
    const users = await User.find().select("-password -_id -createdAt -__v");  ;
    res.status(200).json( users );
})

router.get(("/:email"), async (req, res) => {
    const { email } = req.params;

    const user = await User.findOne({ email }).select("-password -_id -createdAt -__v");
    if(!user){
        return res.status(400).json({ message: "user not found" });
    }
    res.status(200).json( user );
})







module.exports = router;