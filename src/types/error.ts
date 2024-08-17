import {
  ErrorAuth,
  ErrorNotFound,
  ErrorResData,
  ErrorServer,
  ErrorAlreadyExist,
} from "errors";

// TODO: remove
export interface ICustomError {
  code: number;
  message: string;
}

export type TCustomError =
  | ErrorAuth
  | ErrorNotFound
  | ErrorResData
  | ErrorServer
  | ErrorAlreadyExist;
