import ErrorHandler from "../middlewares/errorMiddleware.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import StatusCodes from "../helper/statusCodes.js";
import { User } from './../models/userSchema.js';
import { Appointment } from "../models/appointmentSchema.js";

export const postAppontment = catchAsyncErrors(async (req, res, next) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        nid,
        dob,
        gender,
        appointment_date,
        department,
        doctor_firstName,
        doctor_lastName,
        hasVisited,
        address,
    } = req.body;

    console.log(req.body);

    if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !nid ||
        !dob ||
        !gender ||
        !appointment_date ||
        !department ||
        !doctor_firstName ||
        !doctor_lastName ||
        !address
    ) {

        return next(new ErrorHandler("Please fill all the fields", StatusCodes.BAD_REQUEST));
    }

    const isConflict = await User.find({
        firstName: doctor_firstName,
        lastName: doctor_lastName,
        role: "Doctor",
        doctorDepartment: department,
    })

    if (isConflict.length == 0) {
        return next(new ErrorHandler("Doctor not found", StatusCodes.NOT_FOUND));
    }


    if (isConflict.length > 1) {
        return next(new ErrorHandler("Doctors conflicts! Please Contact Through Email or Phone !", StatusCodes.NOT_FOUND));
    }

    const doctorId = isConflict[0]._id;
    const patientId = req.user._id;

    const appointment = await Appointment.create({
        firstName,
        lastName,
        email,
        phone,
        nid,
        dob,
        gender,
        appointment_date,
        department,
        doctor: {
            firstName: doctor_firstName,
            lastName: doctor_lastName,
        },
        hasVisited,
        address,
        doctorId,
        patientId,

    });

    return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Appointment sent successfully!",
        data: appointment,
    });
});

export const getAllAppointments = catchAsyncErrors(async (req, res, next) => {

    const appointments = await Appointment.find();

    return res.status(StatusCodes.CREATED).json({
        success: true,
        data: appointments,
    });
});


export const updateAppointmentStatus = catchAsyncErrors(
    async (req, res, next) => {
        const { id } = req.params;

        let appointment = await Appointment.findById(id);
        if (!appointment) {
            return next(new ErrorHandler("Appointment not found!", StatusCodes.NOT_FOUND));
        }
        appointment = await Appointment.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });
        res.status(StatusCodes.OK).json({
            success: true,
            message: "Appointment Status Updated!",
        });
    }
);

export const deleteAppointment = catchAsyncErrors(
    async (req, res, next) => {
        const { id } = req.params;

        let appointment = await Appointment.findById(id);
        if (!appointment) {
            return next(new ErrorHandler("Appointment not found!", StatusCodes.NOT_FOUND));
        }
        appointment = await Appointment.deleteOne();
        res.status(StatusCodes.OK).json({
            success: true,
            message: "Appointment Deleted!",
        });
    }
);