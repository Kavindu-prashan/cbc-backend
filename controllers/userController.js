import User from "../models/user.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()

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
export function createUser(req,res){

    const newUserData = req.body
  //admin validation
    if(newUserData.type == "admin"){
  
      if(req.user==null){
        res.json({
          message: "Please login as administrator to create admin accounts"
        })
        return
      }
  
      if(req.user.type != "admin"){
        res.json({
          message: "Please login as administrator to create admin accounts"
        })
        return
      }
  
    }
  
    newUserData.password = bcrypt.hashSync(newUserData.password, 10)  
  
    const user = new User(newUserData)
  
    user.save().then(()=>{
      res.json({
        message: "User created"
      })
    }).catch((error)=>{
      res.json({      
        message: "User not created"
      })
    })
    
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
                    },process.env.secret)
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

export function deleteUser(req,res){
    User.deleteOne({email: req.body.email}).then(
        ()=>{
            res.json({
                message:"Student deleted"
            })
        }
    )
}

export function isAdmin(req){
  if (req.user==null) {
    return false
  }
  if (req.user.type!="admin") {
    return false
  }
  return true
}

// export function isCustomer(res){
//   if (req.user==null) {
//     return false
//   }
//   if (req.user.type!="customer") {
//     return false
//   }
//   return true

// }

export function isCustomer(user) {
  if (!user) {
    return false; // If the user is not defined, they're not a customer.
  }
  return user.type === "customer"; // Check if the user's type is "customer".
}



