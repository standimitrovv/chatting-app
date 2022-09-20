import express from 'express';

import {
  onGetAllUsers,
  onSaveUser,
  onGetSingleUser,
  onUpdateUserActivityStatus,
} from '../controllers/UserController';

export const router = express.Router();

router.post('/create-user', onSaveUser);

router.get('/get-users', onGetAllUsers);

router.get('/get-user/:userId', onGetSingleUser);

router.patch('/update-user-status/:userId', onUpdateUserActivityStatus);
