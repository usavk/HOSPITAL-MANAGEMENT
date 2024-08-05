import { catchAsyncErrors } from "../middleWares/catchAsyncErrors.js";
import ErrorHandler from "../middleWares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import {generateToken} from "../utils/jwtToken.js";
import cloudinary from "cloudinary";

export const patientRegister = catchAsyncErrors(async(req,res,next)=> {
    const {firstName, lastName, email, phone, password, gender, dob, nic, role} = req.body;
    if(!firstName || !lastName || !email || !phone || !password || !gender || !dob || !nic || !role){
        return next(new ErrorHandler("please fill full form", 400));
    }

    let user = await User.findOne({email});
    if(user){
        return next(new ErrorHandler("user already registered", 400));
    }
    user = await User.create({firstName, lastName, email, phone, password, gender, dob, nic, role});
    generateToken(user, "user registered!", 200, res);
});

export const login = catchAsyncErrors(async(req,res,next)=> {
    const {email, password, confirmPassword, role} = req.body;
    if(!email || !password || !confirmPassword || !role){
        return next(new ErrorHandler("please provide all details", 400));
    }
    if(password !== confirmPassword){
        return next(new ErrorHandler("password and confirm password do not match!", 400));
    }
    let user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("invalid password or email", 400));
    }

    let isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("invalid password or email", 400));
    }

    if(role !== user.role){
        return next(new ErrorHandler("user with this role not found", 400));
    }
    generateToken(user, "user login successfully!", 200, res);
});

export const addNewAdmin = catchAsyncErrors(async(req,res,next)=> {
    const {firstName, lastName, email, phone, password, gender, dob, nic} = req.body;
    if(!firstName || !lastName || !email || !phone || !password || !gender || !dob || !nic){
        return next(new ErrorHandler("please fill full form", 400));
    }

    let isRegistered = await User.findOne({email});
    if(isRegistered){
        return next(new ErrorHandler(`${isRegistered.role} with this email already Exists!`, 400));
    }
    let admin = await User.create({firstName, lastName, email, phone, password, gender, dob, nic, role: "Admin",});
    res.status(200).json({
        success: true,
        message: "new Admin registered!",
    });
});

export const getAllDoctors = catchAsyncErrors(async(req,res,next)=> {
    let doctors = await User.find({role: "Doctor"});
    res.status(200).json({
        success: true,
        doctors,
    });
});

export const getUserDetails = catchAsyncErrors(async(req,res,next)=> {
    let user = req.user;
    res.status(200).json({
        success: true,
        user,
    });
});

export const logoutAdmin = catchAsyncErrors(async(req,res,next)=>{
    res.status(200).cookie("adminToken","",{
        httpOnly: true,
        expires: new Date(Date.now()),
    }).json({
        success: true,
        message: "Admin logged out successfully",
    });
});

export const logoutPatient = catchAsyncErrors(async(req,res,next)=>{
    res.status(200).cookie("patientToken","",{
        httpOnly: true,
        expires: new Date(Date.now()),
    }).json({
        success: true,
        message: "Patient logged out successfully",
    });
});

export const addNewDoctor = catchAsyncErrors(async(req,res,next)=>{
    if(!req.files || Object.keys(req.files).length == 0){
        return next(new ErrorHandler("Doctor Avatar Required!", 400));
    }
    const {docAvatar} = req.files;
    const allowedformats = ["image/png","image/jpeg","image/webp"];
    if(!allowedformats.includes(docAvatar.mimetype)){
        return next(new ErrorHandler("file format not supported!", 400));
    }
    const {firstName, lastName, email, phone, password, gender, dob, nic, doctorDepartment} = req.body;
    if(!firstName || !lastName || !email || !phone || !password || !gender || !dob || !nic || !doctorDepartment){
        return next(new ErrorHandler("provide full details", 400));
    }
    let isRegistered = await User.findOne({email});
    if(isRegistered){
        return next(new ErrorHandler(`${isRegistered.role} already registered with this email, 400`));
    }
    let cloudinaryResponse = await cloudinary.uploader.upload(docAvatar.tempFilePath);
    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.error("Clodinary Error:", cloudinaryResponse.error || "unknown clodinary error");
    }
    const doctor = await User.create({firstName, lastName, email, phone, password, gender, dob, nic, doctorDepartment, 
        role: "Doctor", docAvatar: {public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,},});
        res.status(200).json({
            success: true,
            message: "new Doctor registered",
            doctor
        })
});