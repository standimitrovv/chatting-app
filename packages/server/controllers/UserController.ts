import { NextFunction, Request, Response } from 'express';

import { getUserByIdInteractor } from '../interactors/user/GetUserByIdInteractor';
import { getUsersInteractor } from '../interactors/user/GetUsersInteractor';
import { saveUserInteractor } from '../interactors/user/SaveUserInteractor';
import { updateUserActivityStatusInteractor } from '../interactors/user/UpdateUserActivityStatusInteractor';
import { HttpError } from '../models/ErrorModel';

interface RequestBody {
  email: string;
  fullName: string;
  photoUrl: string;
  userId: string;
}

export const onSaveUser = async (req: Request, res: Response) => {
  const { email, fullName, photoUrl, userId } = req.body as RequestBody;

  try {
    await saveUserInteractor(email, fullName, photoUrl, userId);

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
    const users = await getUsersInteractor();

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
    const user = await getUserByIdInteractor(userId);

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
    await updateUserActivityStatusInteractor(userId, status);

    res.json({ message: 'Status updated!' });
  } catch (err) {
    throw new HttpError('Something went wrong, please try again later', 500);
  }
};
