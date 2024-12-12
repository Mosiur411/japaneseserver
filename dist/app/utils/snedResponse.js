"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sentResponse = (res, data) => {
    res.status(data.statusCode).json({
        success: data.success,
        message: data.message,
        data: data.data,
    });
};
exports.default = sentResponse;
