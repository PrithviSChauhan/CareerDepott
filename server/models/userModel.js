import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required:true,
        unique: true
    },
    phoneNum:{
        type: String,
        required: true, 
        // unique: true
    },
    password:{
        type: String, 
        required: true
    },
    role:{
        type: String,
        enum: ['student', 'recruiter'],
        required: true
    },
    profile:{
        bio: { type: String, default: "" },
        skills:[{type: String}],
        resume:{type:String},
        resumeOriginalName:{type: String},
        company:{type:mongoose.Schema.Types.ObjectId, ref:'Company'},
        profilePhoto:{type: String, default:""}
    },
},{timestamps: true});

export const user = mongoose.model('User', userSchema);

