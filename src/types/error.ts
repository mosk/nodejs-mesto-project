import {
  ErrorAuth,
  ErrorNotFound,
  ErrorReqData,
  ErrorServer,
  ErrorAlreadyExist,
  ErrorForbidden,
} from '../errors';

export type TCustomError =
  | ErrorAuth
  | ErrorNotFound
  | ErrorReqData
  | ErrorServer
  | ErrorAlreadyExist
  | ErrorForbidden;
