import type { TCustomError } from 'types';
import { NextFunction, Request, Response } from 'express';

const errorHandler = (
  err: TCustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { statusCode: status = 500, message: msg } = err;
  const message = status === 500 ? 'На сервере произошла ошибка' : msg;

  res.status(status).json({
    status,
    message,
  });

  next();
};

export default errorHandler;
