"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Error handler middleware
const errorHandler = (err, req, res, next) => {
    const status = err.status || 500;
    const isDevelopment = process.env.NODE_ENV === "development";
    res.status(status).json(Object.assign({ error: status === 500 ? "Internal Server Error" : "Error", message: err.message }, (isDevelopment && { stack: err.stack })));
};
exports.default = errorHandler;
