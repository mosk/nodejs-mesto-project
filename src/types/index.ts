import type { Request } from "express";

export { IUser, IUserModel } from "./user";
export { ICard } from "./card";
export { ICustomError, TCustomError } from "./error";

export type TRequestWithId = Request & Record<"user", Record<"_id", string>>;
