import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import validator from "validator";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import StatusCodes from "../helper/statusCodes.js";
import { generateJsonWebToken } from "../utils/jwtToken.js";

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

        return next(new ErrorHandler("Please fill all the fields", StatusCodes.BAD_REQUEST))
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

export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, password, gender, dob, nid } = req.body;

    if (!firstName || !lastName || !email || !phone || !password || !gender || !dob || !nid) {
        return next(new ErrorHandler("Please fill all the fields", StatusCodes.BAD_REQUEST))
    }

    let admin = await User.findOne({ email });

    if (admin) {
        return next(new ErrorHandler(`${admin.role} with this email already registered`))
    }

    if (await User.findOne({ phone })) {
        return next(new ErrorHandler(`User phone ${phone} already registered`))
    }

    admin = await User.create({ firstName, lastName, email, phone, password, gender, dob, nid });

    return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "New Admin successfully registered"
    });
});


export const login = catchAsyncErrors(async (req, res, next) => {

    const { email, password, confirmPassword, role } = req.body;

    if (!email || !password || !confirmPassword || !role) {
        return next(new ErrorHandler("Please fill all the fields", StatusCodes.BAD_REQUEST))
    }

    if (password !== confirmPassword) {
        return next(new ErrorHandler("Password not matched", StatusCodes.BAD_REQUEST))
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return next(new ErrorHandler("Invalid username or password", StatusCodes.NOT_FOUND))
    }

    const isPasswordMatched = user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid username or password", StatusCodes.BAD_REQUEST))
    }


    if (user.role !== role) {
        return next(new ErrorHandler(`User with role ${role} not found`, StatusCodes.NOT_FOUND))
    }

    generateJsonWebToken(user, "User logged in successfully", StatusCodes.OK, res);
});

export const findPatient = catchAsyncErrors(async (req, res, next) => {
    const { email } = req.body;

    if (!email) {
        return next(new ErrorHandler("Email is required", StatusCodes.BAD_REQUEST))
    }

    // Validate email format using validator
    if (!validator.isEmail(email)) {
        return next(new ErrorHandler("Invalid email format", StatusCodes.BAD_REQUEST));
    }

    const user = await User.findOne({ email }).select("-password");

    if (!user) {
        return next(new ErrorHandler("Email doesn't exist", StatusCodes.NOT_FOUND));
    }

    return res.status(StatusCodes.OK).json({
        success: true,
        user
    });
});

export const allPatients = catchAsyncErrors(async (req, res, next) => {

    const page = parseInt(req.params.page, 10) || 1; // Get page from URL, default to 1
    const limit = 10; // Number of users per page
    const skip = (page - 1) * limit; // Calculate skip for pagination

    const user = await User.find({}, { password: 0 })
        .skip(skip)
        .limit(limit);

    if (user.length == 0) {
        return next(new ErrorHandler("No user found", StatusCodes.NOT_FOUND))
    }

    return res.status(StatusCodes.OK).json({
        success: true,
        data: user
    });
});