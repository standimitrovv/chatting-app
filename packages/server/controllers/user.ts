import { Request, Response, NextFunction } from 'express';

import { HttpError } from '../models/error';
import { updateStatus } from '../service/user/updateStatus';
import { saveUser } from '../service/user/saveUser';
import { getUsers } from '../service/user/getUsers';
import { getUserById } from '../service/user/getUserById';

interface RequestBody {
  email: string;
  fullName: string;
  photoUrl: string;
  userId: string;
}

export const createUser = async (req: Request, res: Response) => {
  const { email, fullName, photoUrl, userId } = req.body as RequestBody;

  try {
    await saveUser(email, fullName, photoUrl, userId);

    res.status(201).json({ message: 'User created!' });
  } catch (err) {
    throw new HttpError('Something went wrong, please try again later!', 500);
  }
};

export const getAllUsers = async (
  _: unknown,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await getUsers();

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
    const user = await getUserById(userId);

    res.json({ user });
  } catch (err) {
    return next(
      new HttpError('Something went wrong, please try again later!', 500)
    );
  }
};

export const updateUserStatus = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  const status = req.query.status as string;

  try {
    await updateStatus(userId, status);

    res.json({ message: 'Status updated!' });
  } catch (err) {
    throw new HttpError('Something went wrong, please try again later', 500);
  }
};
