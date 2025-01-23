export const generateJsonWebToken = async (user, message, statusCode, res) => {
    const token = await user.generateJsonWebToken();
    const cookieName = user.role == 'Admin' ? 'adminToken' : 'patientToken';

    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }
    res.status(statusCode).cookie(cookieName, token, options).json({
        success: true,
        message,
        token,
    });
}