import { Request } from "express";

interface IGetUserAuthInfoRequest extends Request {
  user?: any; // Use the appropriate type for the user property
}

export {IGetUserAuthInfoRequest}