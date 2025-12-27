import httpStatus from "http-status";
import { User } from "../models/user.model.js";

export const protect = async (req, res, next) => {
  try {
    let token;

    // Get token from header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // No token
    if (!token) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        status: httpStatus.UNAUTHORIZED,
        message: "Not authorized, token missing",
      });
    }

    // Find user by token
    const user = await User.findOne({ token }).select("-password");

    if (!user) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        status: httpStatus.UNAUTHORIZED,
        message: "Invalid token",
      });
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      status: httpStatus.UNAUTHORIZED,
      message: "Authorization failed",
    });
  }
};

export default protect;