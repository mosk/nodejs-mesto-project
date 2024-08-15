import type { Response } from 'express';
import type { ICustomError } from 'types';

export const extractBearerToken = (v: string) => v.replace('Bearer ', '');

export const sendError = (res: Response, { code, message }: ICustomError) => (
  res.status(code).send({ message })
);
