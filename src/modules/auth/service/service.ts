import { addDays } from "date-fns";

import { AppError } from "@/core/errors";
import { AUTH } from "@/lib/auth";
import {
  generateSessionToken,
  hashPassword,
  hashToken,
  verifyPassword,
} from "@/lib/auth";
import { authRepository } from "../repository";

interface LoginInput {
  email: string;
  password: string;
  ipAddress?: string;
  userAgent?: string;
}

export class AuthService {
  async login({
    email,
    password,
    ipAddress,
    userAgent,
  }: LoginInput) {
    const user = await authRepository.findUserByEmail(email);

    if (!user) {
      throw new AppError("Invalid email or password.");
    }

    if (!user.isActive) {
      throw new AppError("User account is inactive.");
    }

    if (user.lockedAt) {
      throw new AppError("User account is locked.");
    }

    const valid = await verifyPassword(
      password,
      user.password,
    );

    if (!valid) {
      throw new AppError("Invalid email or password.");
    }

    const memberships =
      await authRepository.findActiveMembershipsByUserId(
        user.id,
      );

    if (!memberships.length) {
      throw new AppError(
        "No active membership found.",
      );
    }

    const membership =
      memberships.find((m) => m.isDefault) ??
      memberships[0];

    const token = generateSessionToken();

    const session =
      await authRepository.createSession({
        userId: user.id,
        membershipId: membership.id,
        sessionToken: hashToken(token),

        expiresAt: addDays(
          new Date(),
          AUTH.SESSION.EXPIRES_IN_DAYS,
        ),

        ipAddress,
        userAgent,
      });

    return {
      token,
      session,
      user,
      membership,
    };
  }

  async logout(sessionId: string) {
    return authRepository.revokeSession(sessionId);
  }

  async me(userId: string) {
    return authRepository.findUserById(userId);
  }
}

export const authService = new AuthService();