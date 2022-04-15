import { UserRole } from '@prisma/client';
import { ulid } from 'ulid';
import database from '../../database';

export const retrieve = async (id: string) => {
  const workspace = await database.workspace.findUnique({ where: { id } });
  if (!workspace) {
    throw new Error(`workspace not found [id=${id}]`);
  }

  return workspace;
};

export const retrieveBySlug = async (slug: string) => {
  const workspace = await database.workspace.findUnique({ where: { slug } });
  if (!workspace) {
    throw new Error(`workspace not found [slug=${slug}]`);
  }

  return workspace;
};

export const retrieveByUser = async (userId: string) => {
  return await database.userWorkspace.findMany({
    where: { userId },
    include: { workspace: true },
  });
};

export const retrieveMembers = async (workspaceId: string) => {
  return await database.userWorkspace.findMany({
    where: { workspaceId },
    include: { user: true },
  });
};

export const create = async (slug: string, name: string, ownerId: string) => {
  return await database.workspace.create({
    data: {
      id: `wrk_${ulid()}`,
      name,
      slug,
      users: {
        create: [
          {
            userId: ownerId,
            userRole: UserRole.OWNER,
          },
        ],
      },
    },
  });
};

export const join = async (workspaceId: string, userId: string) => {
  return await database.userWorkspace.create({
    data: {
      userId,
      workspaceId,
      userRole: UserRole.MEMBER,
    },
  });
};

export const leave = async (workspaceId: string, userId: string) => {
  const rel = await database.userWorkspace.findUnique({
    where: { userId_workspaceId: { userId, workspaceId } },
  });

  if (!rel) {
    throw new Error(
      `not in a relationship [workspace=${workspaceId}, user=${userId}]`
    );
  }

  // do not allow the owner to leave
  if (rel.userRole === UserRole.OWNER) {
    throw new Error('elect another owner before leaving the workspace');
  }

  return await database.userWorkspace.delete({
    where: { userId_workspaceId: { userId, workspaceId } },
  });
};
