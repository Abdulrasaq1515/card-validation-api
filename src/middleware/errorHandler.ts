import { Request, Response, NextFunction } from 'express';

/**
 * Global error handler — catches anything thrown by route handlers.
 * Keeps error formatting consistent across the entire API.
 */
export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): void {
  console.error(err.stack);
  res.status(500).json({
    error: 'INTERNAL_SERVER_ERROR',
    message: 'An unexpected error occurred',
  });
}
