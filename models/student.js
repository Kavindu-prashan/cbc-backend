import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        required:true
    }
})

const Student = mongoose.model("students",studentSchema);
export default Student