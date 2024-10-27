import { ACCESS_SECRET } from "../../configs/envConfig.js";
import CustomErrorHandler from "../../services/errorHandler/customErrorHandler.js";
import JwtService from "../../services/jwt/Jwt.js";

async function proctected(req, res, next) {
    const authHeader = req.headers['authorization'];

    const accessToken = authHeader && authHeader.split(' ')[1];
    if (!accessToken) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    let decoded;
    try {
        decoded = await JwtService.verify(accessToken, ACCESS_SECRET);
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return next(CustomErrorHandler.errResponse(401, 'Token Expired'));
        }
        return next(CustomErrorHandler.errResponse(403, 'Invalid Token'));
    }
    req.user = decoded
    next();
}

export default proctected;