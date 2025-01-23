import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
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

    password: {
        type: String,
        required: true,
        minLength: [8, "Password Must Contain At Least 8 Characters"]
    },

    role: {
        type: String,
        required: true,
        enum: ["Admin", "Patient", "Doctor"]
    },
    doctorDepartment: {
        type: String,
    },
    doctorAvatar: {
        public_id: String,
        url: String
    }

});

userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10)
});

userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.generateJsonWebToken = function (){
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES
    })
}

export const User = mongoose.model("user", userSchema);