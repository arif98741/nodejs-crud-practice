import { catchAsyncErrors } from "./catchAsyncErrors.js";
import jwt from 'jsonwebtoken';
import StatusCodes from "../helper/statusCodes.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "./errorMiddleware.js";

export const isAdminAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.adminToken;
    if (!token) {
        return next(new ErrorHandler('Admin not authenticated! ', StatusCodes.UNAUTHORIZED))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);

    if (req.user.role !== 'Admin') {
        return next(
            new ErrorHandler(
                `${req.user.role} not authorized for this resource`,
                StatusCodes.FORBIDDEN
            )
        );
    }
    next();
});


export const isPatientAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.patientToken;
    if (!token) {
        return next(new ErrorHandler('Patient not authenticated! ', StatusCodes.UNAUTHORIZED))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    if (req.user.role !== 'Patient') {
        return next(
            new ErrorHandler(
                `${req.user.role} not authorized for this resource`,
                StatusCodes.FORBIDDEN
            )
        );
    }
    next();
});

export const isDoctorAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.doctorToken;
    if (!token) {
        return next(new ErrorHandler('Doctor not authenticated! ', StatusCodes.UNAUTHORIZED))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    if (req.user.role !== 'Doctor') {
        return next(
            new ErrorHandler(
                `${req.user.role} not authorized for this resource`,
                StatusCodes.FORBIDDEN
            )
        );
    }
    next();
});
