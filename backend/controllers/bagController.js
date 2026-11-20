const User=require('../models/user');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

exports.postAddtoBag =async(req,res,next)=>{
    try{
        console.log("add to bag clicked!!");
        const productId=req.params.productId;
        console.log(productId);
        const token=req.cookies.uid;
        const decoded=jwt.verify(token,secret);
        const user=await User.findById(decoded._id);
        if(!user){
            return res.status(401).json({message:"Login first.."});
        }
        if(!user.bagItems.includes(productId)){
            user.bagItems.push(productId);
            await user.save();
        }
        return res.status(201).json(productId);
    }catch(err){
        console.log("error while add to bag..",err);
        return res.status(401).json({message:"Invalid or expired login session"});
    }
}

exports.getBag = async(req,res,next)=>{
    try {
        const token=req.cookies.uid;
        const decoded=jwt.verify(token,secret);
        const user=await User.findById(decoded._id);
        if(!user){
            return res.status(401).json({message:"Login first.."});
        }
        return res.status(200).json(user.bagItems);
    } catch(err) {
        return res.status(401).json({message:"Invalid or expired login session"});
    }
}
exports.getBagItems = async(req,res,next)=>{
    try {
        const token=req.cookies.uid;
        const decoded=jwt.verify(token,secret);
        const user=await User.findById(decoded._id);
        if(!user){
            return res.status(401).json({message:"Login first.."});
        }
        await user.populate('bagItems');
        console.log("i res you from getbagItems Backend..");
        return res.status(200).json(user.bagItems);
    } catch(err) {
        console.log("error while getting bag items..",err);
        return res.status(401).json({message:"Invalid or expired login session"});
    }
}
exports.deleteFromBag = async(req,res,next)=>{
    try {
        const productId=req.params.productId;
        const token=req.cookies.uid;
        const decoded=jwt.verify(token,secret);
        const user=await User.findById(decoded._id);
        if(!user){
            return res.status(401).json({message:"Login first.."});
        }
        if(user.bagItems.includes(productId)){
            user.bagItems=user.bagItems.filter(pid=>pid.toString()!=productId.toString());
            await user.save();
        }
        return res.status(204).send();
    } catch(err) {
        return res.status(401).json({message:"Invalid or expired login session"});
    }
}
exports.getWishlist = async(req,res,next)=>{
    try {
        const decoded=jwt.verify(req.cookies.uid,secret);
        const user=await User.findById(decoded._id);
        if(!user) return res.status(401).json({message:"Login first.."});
        await user.populate('wishlistItems');
        return res.status(200).json(user.wishlistItems || []);
    } catch(err) {
        return res.status(401).json({message:"Invalid or expired login session"});
    }
}

exports.postWishlist = async(req,res,next)=>{
    try {
        const productId=req.params.productId;
        const decoded=jwt.verify(req.cookies.uid,secret);
        const user=await User.findById(decoded._id);
        if(!user) return res.status(401).json({message:"Login first.."});
        if(!user.wishlistItems) user.wishlistItems=[];
        if(!user.wishlistItems.some(id=>id.toString()===productId)){
            user.wishlistItems.push(productId);
            await user.save();
        }
        return res.status(201).json({productId});
    } catch(err) {
        return res.status(401).json({message:"Invalid or expired login session"});
    }
}

exports.deleteFromWishlist = async(req,res,next)=>{
    try {
        const productId=req.params.productId;
        const decoded=jwt.verify(req.cookies.uid,secret);
        const user=await User.findById(decoded._id);
        if(!user) return res.status(401).json({message:"Login first.."});
        user.wishlistItems=(user.wishlistItems || []).filter(id=>id.toString()!==productId);
        await user.save();
        return res.status(200).json({productId});
    } catch(err) {
        return res.status(401).json({message:"Invalid or expired login session"});
    }
}

