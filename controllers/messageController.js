import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Message } from "../models/mesageSchema.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";

export const sendMessage = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, message } = req.body;

    if (!firstName || !lastName || !email || !phone || !message) {

        return next(new ErrorHandler("Please fill all the fields"))
    }


    await Message.create({ firstName, lastName, email, phone, message });
    return res.status(200).json({
        success: true,
        message: "Message sent successfully!"
    });
})