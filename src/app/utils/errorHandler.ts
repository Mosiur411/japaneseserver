import { Request, Response, NextFunction } from "express";

// Define a custom error interface
interface CustomError extends Error {
  status?: number; // Custom status code
}

// Error handler middleware
const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500; 
  const isDevelopment = process.env.NODE_ENV === "development"; 

  res.status(status).json({
    error: status === 500 ? "Internal Server Error" : "Error",
    message: err.message,
    ...(isDevelopment && { stack: err.stack }), 
  });
};

export default errorHandler;
