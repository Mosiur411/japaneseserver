"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Middleware for handling not found routes
const notFoundHandler = (req, res) => {
    res.status(404).send(`
    <html>
      <head>
        <title>404 Not Found</title>
      </head>
      <body>
        <h1>404 - Page Not Found</h1>
        <p>The requested resource at ${req.originalUrl} was not found on this server.</p>
      </body>
    </html>
  `);
};
exports.default = notFoundHandler;
