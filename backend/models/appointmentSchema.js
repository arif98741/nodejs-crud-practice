import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const appointmentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, "First name must containt at least 3 characters"]
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, "Last name must containt at least 3 characters"]
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please provide a valid email"]
    },
    phone: {
        type: String,
        required: true,
        minLength: [11, "Phone number must contain exact 11 characters"],
        maxLength: [11, "Phone number must contain exact 11 characters"],
    },
    nid: {
        type: String,
        required: true,
        minLength: [10, "NID should contain exact 10 characters!"],
        maxLength: [10, "NID should contain exact 10 characters!"],
    },
    dob: {
        type: Date,
        required: [true, "DOB is Required"],
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female"]
    },
    appointment_date: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    doctor: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        }
    },
    hasVisited: {
        type: Boolean,
        required: true,
    },
    doctorId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        default: false,
    },
    patientId: {
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"]
    },

});


export const Appointment = mongoose.model("appointment", appointmentSchema);