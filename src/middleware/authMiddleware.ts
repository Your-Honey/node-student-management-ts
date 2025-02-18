import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel';
import { Request, Response, NextFunction } from 'express';

interface IGetUserAuthInfoRequest extends Request {
  user?: any; // Use the appropriate type for the user property
}

const isAuth = asyncHandler(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  let token = req.headers.authorization;
  if (token && token.startsWith('Bearer')) {
    try {
      token = token.split(' ')[1];
      const decode = jwt.verify(token, process.env.JWT_SECRET || 'this secret should be in env file') as jwt.JwtPayload;
      req.user = await User.findById(decode.id).select('-password');

      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

export default isAuth;
