import mongoose, { mongo } from "mongoose";  

const compannySchema = new mongoose.Schema({
    companyName:{
        type: String,
        required : true
    },
    companyLocation:{
        type: String,
    },
    website:{
        type: String
    },
    logo:{
        type: String
    },
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
}, {timestamps: true});

export const Company = mongoose.model("Company", compannySchema);