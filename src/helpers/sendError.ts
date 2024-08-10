import type { Response } from 'express';
import type { ICustomError } from '../types';

// eslint-disable-next-line import/prefer-default-export
export const sendError = (res: Response, { code, message }: ICustomError) => (
  res.status(code).send({ message })
);
