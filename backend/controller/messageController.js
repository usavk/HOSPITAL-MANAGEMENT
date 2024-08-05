import { Message } from "../models/messageSchema.js";
import {catchAsyncErrors} from "../middleWares/catchAsyncErrors.js"
import ErrorHandler from "../middleWares/errorMiddleware.js";

export const sendMessage = catchAsyncErrors(async(req,res,next) => {
    const {firstName,lastName,email,phone,message} =req.body;
    if(!firstName || !lastName || !email || !phone || !message){
        return next(new ErrorHandler("please fill full form",400));
        /*return res.status(400).json({
            success: false,
            message: "please fill full form",
        });*/
    }
    await Message.create({ firstName, lastName, email, phone, message });
    res.status(200).json({
        success: true,
        message: "message sent successfully",
    });

});

export const getAllMessages = catchAsyncErrors(async(req,res,next)=>{
    let messages = await Message.find();
    res.status(200).json({
        success: true,
        messages,
    });
});

/*
import { Message } from "../models/messageSchema.js";

export const sendMessage = async (req, res, next) => {
    const { firstName, lastName, email, phone, message } = req.body;

    if (!firstName || !lastName || !email || !phone || !message) {
        return res.status(400).json({
            success: false,
            message: "Please fill the full form",
        });
    }

    try {
        await Message.create({ firstName, lastName, email, phone, message });
        res.status(200).json({
            success: true,
            message: "Message sent successfully",
        });
    } catch (error) {
        console.error('Error creating message:', error);  // Log the error for debugging
        res.status(500).json({
            success: false,
            message: "An error occurred while sending the message",
            error: error.message,  // Optional: Include error message for debugging purposes
        });
    }
};*/
