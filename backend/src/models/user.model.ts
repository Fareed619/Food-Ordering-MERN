import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    auth0Id: {
        type: String, 
        required: true
    },
    email: {
        type:String,
        required: true
    },
    name: {
        type: String,
    },
    city: {
        type: String,
    },
    addressLine1: {
        type: String,
    },
    country: {
        type: String,
    },
        

}, {timestamps:true});

const User = mongoose.model('user', userSchema)
export default User;