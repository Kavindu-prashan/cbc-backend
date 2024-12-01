import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    isBlocked:{
        type:Boolean,
        default:false
   },
   type:{
        type:String,
        default:"customer"
   },
   profilePicture:{
        type:String,
        default:"https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"
   }
})

const User = mongoose.model("User", userSchema);
export default User;