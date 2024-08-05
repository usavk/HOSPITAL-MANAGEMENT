import mongoose  from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, "firstname must conatin at least 3 characters"]
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, "firstname must conatin at least 3 characters"]
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "please provide valid email"]
    },
    phone: {
        type: String,
        required: true,
        minLength: [11, "phone number must conatin exact 11 digits"],
        maxLength: [11, "phone number must conatin exact 11 digits"],
    },
    message: {
        type: String,
        required: true,
    },
});

export const Message = mongoose.model("Message",messageSchema);