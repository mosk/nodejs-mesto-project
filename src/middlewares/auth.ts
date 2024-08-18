import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ErrorAuth } from '../errors';
import { COOKIE_NAME } from '../consts';
import { extractBearerToken } from '../helpers';
import getAppConfig from '../../config';

const { secretKey } = getAppConfig();

const auth = (req: Request, res: Response, next: NextFunction) => {
  const cookie = req.cookies[COOKIE_NAME];

  if (!cookie) return next(new ErrorAuth('Ошибка авторизации'));

  const token = extractBearerToken(cookie);

  try {
    const payload = jwt.verify(token, secretKey);
    res.locals.user = payload;
  } catch (err) {
    return next(new ErrorAuth('Ошибка авторизации'));
  }

  return next();
};

export default auth;
