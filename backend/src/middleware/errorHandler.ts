import { Request, Response, NextFunction } from 'express';
import Log from '../models/log';

export interface CustomError extends Error {
  statusCode?: number;
}

export const errorHandler = async (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  let error = { ...err };
  error.message = err.message;

  // Log to console for 
  console.error(err);

  // Log error to MongoDB
  try {
    await Log.create({
      level: 'error',
      message: err.message,
      stack: err.stack,
      user: (req as any).user?.id,
      endpoint: req.originalUrl,
      method: req.method
    });
  } catch (logError) {
    console.error('Failed to log error:', logError);
  }

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = { name: 'CastError', message, statusCode: 404 } as CustomError;
  }

  // Mongoose duplicate key
  if ((err as any).code === 11000) {
    const message = 'Duplicate field value entered';
    error = { name: 'DuplicateKey', message, statusCode: 400 } as CustomError;
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values((err as any).errors).map((val: any) => val.message).join(', ');
    error = { name: 'ValidationError', message, statusCode: 400 } as CustomError;
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Server Error'
  });
};