import validator from 'validator'
import userModel from '../models/UserModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const generateToken = async (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

const login = async(req,res)=>{
    try {
        const {email,password} =req.body

        if(!email || !password){
            return res.status(400).json({message:"Please fill all the fields"})
        }

        const user = await userModel.findOne({email})

        if(!user){
            return res.status(400).json({message:"User not found"})
        }

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"})
        }
        if(isMatch){
            const token = await generateToken(user._id)
            res.json({"sucess":true,"token":token})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server error"})
    }
}


const register = async(req,res)=>{
    const {email,password,name} = req.body

    if(!email || !password || !name){
        return res.status(400).json({message:"Please fill all the fields"})
    }

    const isAlreadyExist = await userModel.findOne({email})

    if(isAlreadyExist){
        return res.status(400).json({message:"User already exists"})
    }

    if(!validator.isEmail(email)){
        return res.status(400).json({message:"Please enter a valid email"})
    }

    if(!validator.isStrongPassword(password)){
        return res.status(200).json({sucess:false,message:"Please enter a strong password"})
    }


    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt);

    const newUser = await userModel.create({
        name,
        email,
        password:hashedPassword
    })

    const token = await generateToken(newUser._id)

    res.json({"sucess":true,"token":token})


}


const admin = async (req,res)=>{
   try {
    const { email, password } = req.body;

    if (
      email !== process.env.ADMIN_EMAIL &&
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = await generateToken(process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD);
    console.log(process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD)

    res.json({ sucess: true, token: token });
   } catch (error) {
     console.log(error)
     return res.status(500).json({ message: "Internal server error" });
   }
}


const currentUser = async (req, res) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const currentUser = await userModel.findById(decoded.id);

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(currentUser); // ✅ now returns a single object
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


export {login,register, admin,currentUser}