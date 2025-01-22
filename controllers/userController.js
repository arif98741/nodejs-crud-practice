import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";

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

        return next(new ErrorHandler("Please fill all the fields"))
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

    return res.status(200).json({
        success: true,
        message: "User successfully registered"
    });
})