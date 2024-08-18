import {
  ErrorAuth,
  ErrorNotFound,
  ErrorResData,
  ErrorServer,
  ErrorAlreadyExist,
  ErrorForbidden,
} from '../errors';

export type TCustomError =
  | ErrorAuth
  | ErrorNotFound
  | ErrorResData
  | ErrorServer
  | ErrorAlreadyExist
  | ErrorForbidden;
