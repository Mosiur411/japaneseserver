import { Request, Response, NextFunction } from "express";

// Middleware for handling not found routes
const notFoundHandler = (req: Request, res: Response) => {
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


export default notFoundHandler;
