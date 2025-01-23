import StatusCodes from "../helper/statusCodes.js";

class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;

    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`,
            err = new ErrorHandler(message, StatusCodes.BAD_REQUEST);
    }
    if (err.name === "JsonWebTokenError") {
        const message = `Json Web Token is invalid, Try again!`;
        err = new ErrorHandler(message, StatusCodes.BAD_REQUEST);
    }
    if (err.name === "TokenExpiredError") {
        const message = `Json Web Token is expired, Try again!`;
        err = new ErrorHandler(message, StatusCodes.BAD_REQUEST);
    }
    if (err.name === "CastError") {
        const message = `Invalid ${err.path}`,
            err = new ErrorHandler(message, StatusCodes.BAD_REQUEST);
    }

    const errorMessage = err.errors
        ? Object.values(err.errors)
            .map((error) => error.message)
            .join(" ")
        : err.message;


    return res.status(err.statusCode).json({
        success: false,
        message: errorMessage,
    });
};


export default ErrorHandler;