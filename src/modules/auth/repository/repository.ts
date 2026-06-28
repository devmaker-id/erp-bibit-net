import { prisma } from "@/lib/prisma";

export class AuthRepository {
  /**
   * Find user by email.
   */
  async findUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  /**
   * Find user by id.
   */
  async findUserById(id: string) {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  /**
   * Find active memberships.
   */
  async findMemberships(userId: string) {
    return prisma.membership.findMany({
      where: {
        userId,
        isActive: true,
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

  /**
   * Create session.
   */
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

  /**
   * Find session by token.
   */
  async findSession(sessionToken: string) {
    return prisma.session.findUnique({
      where: {
        sessionToken,
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

  /**
   * Update session activity.
   */
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

  /**
   * Revoke session.
   */
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

  /**
   * Delete expired sessions.
   */
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