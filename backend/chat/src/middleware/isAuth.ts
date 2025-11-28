import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
}

export interface AuthenticatedRequest extends Request {
  user?: IUser | null;
}

export const isAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        message: "Please Login - No Auth header",
      });
      return;
    }

    const token = authHeader.split(" ")[1];
    // ...existing code...


    if (!token) {
      res.status(401).json({ message: "Please Login - No token" });
      return;
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      // fail fast — server misconfiguration
      res.status(500).json({ message: "Server misconfiguration: JWT secret not set" });
      return;
    }

    let decodedValue: JwtPayload;
    try {
      decodedValue = jwt.verify(token, secret) as JwtPayload;
    } catch (err) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    if (!decodedValue || !decodedValue.user) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    

    req.user = decodedValue.user;

    next();
  } catch (error) {
    res.status(401).json({
      message: "Please Login - JWT error",
    });
  }
};

export default isAuth;
