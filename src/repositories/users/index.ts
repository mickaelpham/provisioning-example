import { ulid } from 'ulid';
import database from '../../database';

export const create = async (name: string, email: string) => {
  return await database.user.create({
    data: {
      id: `usr_${ulid()}`,
      name,
      email,
    },
  });
};

export const retrieve = async (id: string) => {
  const user = await database.user.findUnique({ where: { id } });
  if (!user) {
    throw new Error(`user not found [id=${id}]`);
  }

  return user;
};

export const update = async (id: string, name?: string, email?: string) => {
  return await database.user.update({ where: { id }, data: { name, email } });
};
