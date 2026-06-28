import { prisma } from "@/database/prisma";

export class AuthRepository {
  async findUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findUserById(id: string) {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findMemberships(userId: string) {
    return prisma.membership.findMany({
      where: {
        userId,
        isActive: true,
        resignedAt: null,
        user: {
          isActive: true,
          deletedAt: null,
        },
        company: {
          isActive: true,
          deletedAt: null,
        },
        branch: {
          isActive: true,
          deletedAt: null,
        },
        role: {
          isActive: true,
          deletedAt: null,
        },
      },
      include: {
        company: true,
        branch: true,
        role: {
          include: {
            rolePermissions: {
              where: {
                isActive: true,
              },
              include: {
                permission: true,
              },
            },
          },
        },
      },
      orderBy: [
        {
          isDefault: "desc",
        },
        {
          joinedAt: "asc",
        },
      ],
    });
  }

  async createSession(data: {
    userId: string;
    membershipId: string;
    sessionToken: string;
    expiresAt: Date;
    ipAddress?: string;
    userAgent?: string;
  }) {
    return prisma.session.create({
      data,
    });
  }

  async findSession(sessionToken: string) {
    return prisma.session.findFirst({
      where: {
        sessionToken,
        isActive: true,
        revokedAt: null,
        expiresAt: {
          gt: new Date(),
        },
      },
      include: {
        user: true,
        membership: {
          include: {
            company: true,
            branch: true,
            role: {
              include: {
                rolePermissions: {
                  where: {
                    isActive: true,
                  },
                  include: {
                    permission: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async touchSession(id: string) {
    return prisma.session.update({
      where: {
        id,
      },
      data: {
        lastActivityAt: new Date(),
      },
    });
  }

  async revokeSession(id: string) {
    return prisma.session.update({
      where: {
        id,
      },
      data: {
        revokedAt: new Date(),
        isActive: false,
      },
    });
  }

  async revokeSessionByToken(sessionToken: string) {
    return prisma.session.updateMany({
      where: {
        sessionToken,
        isActive: true,
      },
      data: {
        revokedAt: new Date(),
        isActive: false,
      },
    });
  }

  async deleteExpiredSessions() {
    return prisma.session.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });
  }
}

export const authRepository = new AuthRepository();
