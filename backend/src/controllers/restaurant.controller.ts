import { Request, Response } from "express"
import Restaurant from "../models/restaurant.model"
import { uploadToCloudinary } from "../utils/uploadToCloudinary"
import mongoose from "mongoose"



export const createMyRestaurantController = async (req: Request, res: Response): Promise<any> => {

    try {
        const existingRestaurant = await Restaurant.findOne({user: req.userId})
    
        if(existingRestaurant){
            return res.status(409).json({message: "User restaurant already exists"})
        }



        const url = await uploadToCloudinary(req.file)
        const restaurant = new Restaurant(req.body);
        restaurant.imageUrl = url
        restaurant.user = new mongoose.Types.ObjectId(req.userId)
        restaurant.lastUpdated = new Date();

        await restaurant.save();
        res.status(201).json(restaurant)
    } catch (error) {
        console.log("error in create my restaurant controller " + error)
        res.status(500).json({message: "Something went wrong"})
    }
}
        