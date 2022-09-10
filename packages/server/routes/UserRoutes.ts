import express from 'express';

import {
  getAllUsers,
  createUser,
  getSingleUser,
  updateUserStatus,
} from '../controllers/UserController';

export const router = express.Router();

router.post('/create-user', createUser);

router.get('/get-users', getAllUsers);

router.get('/get-user/:userId', getSingleUser);

router.patch('/update-user-status/:userId', updateUserStatus);
