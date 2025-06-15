import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

//Protect routes
const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Read jwt from cookie
    token = req.cookies.jwt;

    if(token){
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select("-password");
        }
        catch (error) {
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
        next();
    }
    else{
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});

// Admin middleware
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error("Not authorized as an admin");
    }
}
// Check active membership middleware
const member = (req, res, next) => {
    if (req.user && req.user.membership && req.user.membership.length > 0) {
        // Get the most recent membership
        const latestMembership = req.user.membership.reduce((latest, current) => {
            return new Date(current.buyDate) > new Date(latest.buyDate) ? current : latest;
        }, req.user.membership[0]);
        
        // Check if membership is still valid (within 1 year of buy date)
        const buyDate = new Date(latestMembership.buyDate);
        const expiryDate = new Date(buyDate.setDate(buyDate.getDate() + 30));
        
        if (new Date() <= expiryDate) {
            next();
        } else {
            res.status(403);
            throw new Error("Membership expired. Please renew your membership.");
        }
    } else {
        res.status(403);
        throw new Error("Active membership required to access this feature");
    }
};

export { protect, admin, member };