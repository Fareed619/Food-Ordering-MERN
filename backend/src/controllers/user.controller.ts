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

