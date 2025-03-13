import { auth } from "express-oauth2-jwt-bearer";
import { configDotenv } from "dotenv";
configDotenv()


export const jwtCheck = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    tokenSigningAlg: 'RS256'
});