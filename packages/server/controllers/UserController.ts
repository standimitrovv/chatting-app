import { Request, Response, NextFunction } from 'express';

import { HttpError } from '../models/ErrorModel';
import { updateUserActivityStatus } from '../interactors/user/UpdateUserActivityStatus';
import { saveUser } from '../interactors/user/SaveUser';
import { getUsers } from '../interactors/user/GetUsers';
import { getUserById } from '../interactors/user/GetUserById';

interface RequestBody {
  email: string;
  fullName: string;
  photoUrl: string;
  userId: string;
}

export const onSaveUser = async (req: Request, res: Response) => {
  const { email, fullName, photoUrl, userId } = req.body as RequestBody;

  try {
    await saveUser(email, fullName, photoUrl, userId);

    res.status(201).json({ message: 'User created!' });
  } catch (err) {
    throw new HttpError('Something went wrong, please try again later!', 500);
  }
};

export const onGetAllUsers = async (
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

export const onGetSingleUser = async (
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

export const onUpdateUserActivityStatus = async (
  req: Request,
  res: Response
) => {
  const userId = req.params.userId;

  const status = req.query.status as string;

  try {
    await updateUserActivityStatus(userId, status);

    res.json({ message: 'Status updated!' });
  } catch (err) {
    throw new HttpError('Something went wrong, please try again later', 500);
  }
};
