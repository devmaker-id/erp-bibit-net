import { addDays } from "date-fns";

import { prisma } from "@/lib/prisma";

import { AUTH } from "./constants";
import {
  generateSessionToken,
  hashToken,
} from "./token";

interface CreateSessionOptions {
  userId: string;
  membershipId: string;
  ipAddress?: string;
  userAgent?: string;
}

export async function createSession({
  userId,
  membershipId,
  ipAddress,
  userAgent,
}: CreateSessionOptions) {
  const token = generateSessionToken();

  const session = await prisma.session.create({
    data: {
      userId,
      membershipId,

      sessionToken: hashToken(token),

      ipAddress,
      userAgent,

      expiresAt: addDays(
        new Date(),
        AUTH.SESSION_EXPIRES_IN_DAYS,
      ),
    },
  });

  return {
    token,
    session,
  };
}
export async function getSession(
  token: string,
) {
  return prisma.session.findUnique({
    where: {
      sessionToken: hashToken(token),
    },
    include: {
      user: true,

      membership: {
        include: {
          company: true,
          branch: true,
          role: true,
        },
      },
    },
  });
}
export async function revokeSession(
  token: string,
) {
  return prisma.session.update({
    where: {
      sessionToken: hashToken(token),
    },
    data: {
      revokedAt: new Date(),
      isActive: false,
    },
  });
}
export async function deleteExpiredSessions() {
  return prisma.session.deleteMany({
    where: {
      expiresAt: {
        lt: new Date(),
      },
    },
  });
}
export async function touchSession(
  token: string,
) {
  return prisma.session.update({
    where: {
      sessionToken: hashToken(token),
    },
    data: {
      lastActivityAt: new Date(),
    },
  });
}