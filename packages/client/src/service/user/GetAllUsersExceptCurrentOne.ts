import { getUsers } from './GetUsers';

export const getAllUsersExceptCurrentOne = async (userId: string) => {
  const users = await getUsers();

  return users.filter((user) => user.userId !== userId);
};
