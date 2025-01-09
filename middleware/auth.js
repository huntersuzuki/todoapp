import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token)
    return res.status(404).json({
      success: false,
      message: "User not logged in ",
    });
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decoded);
  console.log(decoded._id);

  req.user = await User.findById(decoded.id);
  next();
};
