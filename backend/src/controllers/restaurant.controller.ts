import { Request, Response } from "express";
import Restaurant from "../models/restaurant.model";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";
import mongoose from "mongoose";

export const createMyRestaurantController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const existingRestaurant = await Restaurant.findOne({ user: req.userId });

    if (existingRestaurant) {
      return res
        .status(409)
        .json({ message: "User restaurant already exists" });
    }

    const url = await uploadToCloudinary(req.file as Express.Multer.File);
    const restaurant = new Restaurant(req.body);
    restaurant.imageUrl = url;
    restaurant.user = new mongoose.Types.ObjectId(req.userId);
    restaurant.lastUpdated = new Date();

    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (error) {
    console.log("error in create my restaurant controller " + error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getMyRestaurantController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.userId });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    console.log("error in get my restaurant controller ", error);
    res.status(500).json({ message: "Error fetching restaurant" });
  }
};

export const updateMyRestaurantController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const existingRestaurant = await Restaurant.findOne({ user: req.userId });
    if (!existingRestaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    if (req.file) {
      const url = await uploadToCloudinary(req.file as Express.Multer.File);
      existingRestaurant.imageUrl = url;
    }
    existingRestaurant.restaurantName = req.body.restaurantName;
    existingRestaurant.city = req.body.city;
    existingRestaurant.country = req.body.country;
    existingRestaurant.deliveryPrice = req.body.deliveryPrice;
    existingRestaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
    existingRestaurant.cuisines = req.body.cuisines;
    existingRestaurant.menuItems = req.body.menuItems;
    existingRestaurant.lastUpdated = new Date();

    await existingRestaurant.save();
    return res.status(200).json(existingRestaurant);
  } catch (error) {
    console.log("error in update my restaurant controller ", error);
    res.status(500).json({ message: "Failed to update restaurant" });
  }
};
