import { Request, Response } from "express"
import User from "../models/user.model";


export const createCurrentUserController = async (req:Request, res:Response): Promise<any> => {
    try {
        const {auth0Id} = req.body;
        const existingUser = await User.findOne({auth0Id});
        
        if(existingUser){
            return res.status(200).json(existingUser.toObject())
        }

        const newuser = new User(req.body)
        await newuser.save()

        res.status(201).json(newuser.toObject())
        
    } catch (error) {
        console.log("error in create current user controller " + error)
        res.status(500).json({message: "Error creating user"})
        
    }

}


export const updateUserProfileController = async (req:Request, res:Response):Promise<any> => {
    try {
        const {name, addressLine1, country, city} = req.body;
        const user = await User.findById(req.userId)
       if(!user){
        return res.status(404).json({message: "User not found"});
       }
       user.name = name;
       user.addressLine1 = addressLine1;
       user.city = city;
       user.country = country;

       await user.save()
       res.send(user)    
    } catch (error) {
        console.log("error in update user controller "+ error)
        res.status(500).json({message: "Error updating user"})
    }
        

}

export const getUserProfileInfoController = async (req:Request, res: Response): Promise<any>  => {
    console.log("here we go")
    try {
        const user = await User.findById(req.userId)
        if(!user){
            return res.status(400).json({message: "User not found"})
        }
        res.status(200).json(user)
        
    } catch (error) {
        console.log("error in get user profile info controller "+ error)
        res.status(500).json({message: "Something went wrong"})
    }
        

}