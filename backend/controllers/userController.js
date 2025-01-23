import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import validator from "validator";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import StatusCodes from "../helper/statusCodes.js";

export const patientRegister = catchAsyncErrors(async (req, res, next) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        nid,
        role
    } = req.body;

    console.log(req.body)

    if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !password ||
        !gender ||
        !dob ||
        !nid ||
        !role
    ) {

        return next(new ErrorHandler("Please fill all the fields",StatusCodes.BAD_REQUEST))
    }


    let user = await User.findOne({ email });
    if (user) {
        return next(new ErrorHandler(`User ${email} already registered`))
    }


    if (await User.findOne({ phone })) {
        return next(new ErrorHandler(`User phone ${phone} already registered`))
    }

    user = await User.create({
        firstName,
        lastName,
        email, phone,
        password,
        gender,
        dob,
        nid,
        role
    });

    return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "User successfully registered"
    });
});

export const findPatient = catchAsyncErrors(async (req, res, next) => {
    const { email } = req.body;

    if (!email) {
        return next(new ErrorHandler("Email is required",StatusCodes.BAD_REQUEST))
    }

    // Validate email format using validator
    if (!validator.isEmail(email)) {
        return next(new ErrorHandler("Invalid email format",StatusCodes.BAD_REQUEST));
    }

    const user = await User.findOne({ email }).select("-password");

    if (!user) {
        return next(new ErrorHandler("Email doesn't exist", StatusCodes.NOT_FOUND));
    }

    return res.status(StatusCodes.OK).json({
        success: true,
        user
    });
})