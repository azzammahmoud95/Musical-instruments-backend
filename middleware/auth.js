"use strict";
// import jwt from "jsonwebtoken";
// import { NextFunction, Request, Response } from "express";
// export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const token = req.cookies.token;
//     if (!token) {
//       return res.status(401).json({ message: "No token provided" });
//     }
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };
