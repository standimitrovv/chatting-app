import { Request, Response, NextFunction } from 'express';

import { UserModel } from '../models/user';
import { HttpError } from '../models/error';

export const createUser = async (req: Request, res: Response) => {
  const { email, fullName, photoUrl, userId } = req.body;

  try {
    const existingUser = await UserModel.findOne({ userId });

    if (!existingUser) {
      const createdUser = new UserModel({ email, fullName, photoUrl, userId });

      try {
        await createdUser.save();

        res.status(201).json({ message: 'User created!' });
      } catch (err) {
        throw new HttpError('Could not save the user', 400);
      }
    } else {
      res.status(200).json({ message: 'User already exists!' });
    }
  } catch (err) {
    throw new HttpError('Something went wrong, please try again later!', 500);
  }
};

export const getAllUsers = async (
  _: never,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await UserModel.find();
    if (!users || users.length === 0) {
      return next(new HttpError('No users found', 400));
    }
    res.json({ users });
  } catch (err) {
    return next(
      new HttpError('Something went wrong, please try again later!', 500)
    );
  }
};

export const getSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.userId;
  try {
    const user = await UserModel.findOne({ userId });
    if (!user || user.length === 0) {
      return next(new HttpError('No user found', 400));
    }
    res.json({ user });
  } catch (err) {
    return next(
      new HttpError('Something went wrong, please try again later!', 500)
    );
  }
};
