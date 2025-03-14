import { auth } from "express-oauth2-jwt-bearer";
import { configDotenv } from "dotenv";
import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
configDotenv()

declare global {
    namespace Express {
        interface Request {
            auth0Id: string
            userId?: string;
        }
    }
}

export const jwtCheck = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    tokenSigningAlg: 'RS256'
});

export const jwtParse = async (req:Request, res:Response, next:NextFunction): Promise<any> => {
    const {authorization} = req.headers
    console.log(authorization)

    if(!authorization || !authorization.startsWith("Bearer ")){
        return res.sendStatus(401)
    }
    const token = authorization.split(" ")[1];
    console.log(token)

    try {
        const decoded = jwt.decode(token) as jwt.JwtPayload;
        console.log(decoded)
        const auth0Id = decoded.sub;
        const user = await User.findOne({auth0Id})
        if(!user){
            return res.sendStatus(401)
        }
        req.auth0Id = auth0Id as string;
        req.userId = user._id.toString()
        next()
    } catch (error) {
        console.log("error in jwtparse function " + error)
        return res.sendStatus(401)
    }
        
   


} 