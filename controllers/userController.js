import User from "../models/user.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";


// Get all users
export function getUser(req, res) {
    User.find()
        .then((userList) => {
            res.status(200).json({
                list: userList,
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: "Users not found",
                error: error.message,
            });
        });
}

// Create a new user
export function createUser(req, res) {
    const newUserData = req.body;

    // Hash the password correctly
    if (!newUserData.password) {
        return res.status(400).json({ message: "Password is required" });
    }

    newUserData.password = bcrypt.hashSync(newUserData.password, 10); // Use the correct key

    console.log(newUserData);

    const newUser = new User(newUserData); // Create a new instance of the User model

    newUser
        .save()
        .then(() => {
            res.status(201).json({
                message: "User saved successfully",
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: "User save failed",
                error: error.message,
            });
        });
}

export function loginUser(req, res){
    User.find({email :req.body.email}).then(
        (users)=>{
            if(users.length == 0){
                res.json({
                    message:"User not found"
                })
            }else{
                const user = users[0]

                const isPasswordCorrect = bcrypt.compareSync(req.body.password,user.password)

                if(isPasswordCorrect){

                    const token = jwt.sign({
                        email : user.email,
                        firstName :user.firstName,
                        lastName : user.lastname,
                        isBlocked : user.isBlocked,
                        type : user.type,
                        profilePicture :user.profilePicture
                    },"cbc-secret-key-7973")
                    console.log(token)

                    res.json({
                        message:"User logged in",
                        token:token
                    })

                
                }else{
                    res.json({
                        message:"User not logged in (wrong password)"
                    })
                }
            }
        }
    )
}