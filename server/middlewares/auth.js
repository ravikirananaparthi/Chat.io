import { User } from "../models/user.js";
import jwt from "jsonwebtoken";


export const isAuthenticated = async (req, res, next) => {
  try {
  
    let token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded._id);
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
};
