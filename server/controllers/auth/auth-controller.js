const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

const registerUser = async (req, res) => {
    const {username, email, password} = req.body;
    try{
        const checkUser = await  User.findOne({email});
        if(checkUser)
            return res.status(400).json({
                success: false,
                message : "User already exists with the same email! Please try again later"
            })

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser =  new User({
            username,
            email,
            password : hashPassword
        });

        await  newUser.save();
        res.status(201).json({
            success : true,
            message:"Registeration successfully"
        })
    }catch (e) {
        console.log(e);
        res.status(401).json({
            success : false,
            message : "Some error occured"
        })
    }
}

const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try{
        const checkUser = await  User.findOne({email});
        if(!checkUser){
            return res.status(400).json({
                success : false,
                message : "User doesn't exists Please register first"
            })
        }
        const checkPasswordMatch = await bcrypt.compare(password, checkUser.password);
        if(!checkPasswordMatch){
            return  res.status(401).json({
                success : false,
                message : "Incorrect password ! Please try agnain "
            });
        }

        const token = jwt.sign({
            id : checkUser._id,
            role : checkUser.role ,
            email : checkUser.email,
            userName : checkUser.username
        }, 'CLIENT_SECRET_KEY', {expiresIn: '60m'});

        res.cookie('token', token, {httpOnly : true, secure : false}).json({
            success : true,
            message : 'Logged in successfully',
            user : {
                email : checkUser.email,
                role : checkUser.role,
                id : checkUser._id,
                userName : checkUser.username
            }
        })

        // res.status(200).json({
        //     success : true,
        //     message:"login successfully"
        // })
    }catch (e) {
        console.log(e);
        res.status(401).json({
            success : false,
            message : "Some error occured"
        })
    }
}

const logoutUser = async function(req, res){
    res.clearCookie('token' , {
        httpOnly: true,
        secure: false,// i complete
    } ).json({
        success : true,
        message : "Logged out successfully!"
    })
}

const authMiddleware = async function(req, res, next){
    const token = req.cookies.token;
    if(!token) return res.status(401).json({
        success : false,
        message : 'Unauthorized user!'
    })

    try{
        const decoded = jwt.verify(token, 'CLIENT_SECRET_KEY');
        req.user = decoded;
        next();
    }catch(error){
        res.status(401).json({
            success : false,
            message : "Unauthorized user!"
        })
    }
}


module.exports = { registerUser, loginUser, logoutUser, authMiddleware}