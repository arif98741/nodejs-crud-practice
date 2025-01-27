import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import validator from "validator";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import StatusCodes from "../helper/statusCodes.js";
import { generateJsonWebToken } from "../utils/jwtToken.js";
import cloudinary from 'cloudinary';

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


export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {

    const doctors = await User.find({ role: "Doctor" })

    return res.status(StatusCodes.OK).json({
        success: true,
        data: doctors
    });
});

export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = req.user;

    return res.status(StatusCodes.OK).json({
        success: true,
        data: user
    });
});

export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {

    return res.status(StatusCodes.OK).cookie("adminToken", "", {
        httpOnly: true,
        expire: new Date(Date.now()),
    }).json({
        success: true,
        message: "Admin logged out successfully",
    });
});

export const logoutPatient = catchAsyncErrors(async (req, res, next) => {

    return res.status(StatusCodes.OK).cookie("patientToken", "", {
        httpOnly: true,
        expire: new Date(Date.now()),
    }).json({
        success: true,
        message: "User logged out successfully",
    });
});

export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Doctor avatar required", StatusCodes.BAD_REQUEST))
    }

    const { docAvatar } = req.files;
    const allowdFormats = ["image/png", "image/jpg", "image/webp"];

    const {
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        nid,
        doctorDepartment } = req.body;

    if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !password ||
        !gender ||
        !dob ||
        !nid ||
        !doctorDepartment) {

        return next(new ErrorHandler("Please provide full details", StatusCodes.BAD_REQUEST))
    }

    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        return next(new ErrorHandler(`${isRegistered.role} already registered with this email`, StatusCodes.BAD_REQUEST))

    }

    const uploadPath = "users/profile"
    const cloudinaryResponse = await cloudinary.v2.uploader.upload(docAvatar.tempFilePath, {
        folder: uploadPath
    });

    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error("Cloudinary Error :",
            cloudinaryResponse.error || `Uknown Cloudinary Error`
        )
    }

    const doctor = await User.create({
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        nid,
        doctorDepartment,
        role: "Doctor",
        docAvatar: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url
        }
    });

    return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "New Doctor successfully registered!",
        data: doctor,
    });
});