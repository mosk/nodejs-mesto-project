import type { Request, Response, NextFunction } from 'express';
import type { TRequestWithId } from '../types';

const auth = (req: Request, res: Response, next: NextFunction) => {
  // fake auth
  (req as TRequestWithId).user = {
    _id: '66b52b51d66cdbae934287d9',
  };

  next();
};

export default auth;
