import { addDays } from "date-fns";

import { AppError } from "@/core/errors";

import { AUTH } from "@/lib/auth";
import { verifyPassword } from "@/lib/auth";
import {
  generateSessionToken,
  hashToken,
} from "@/lib/auth";

import { authRepository } from "../repository";
import type { LoginInput } from "../validation";

export class AuthService {
  /**
   * Authenticate user.
   */
  async login(input: LoginInput) {
    const user = await authRepository.findUserByEmail(input.email);

    if (!user) {
      throw new AppError("Invalid email or password.");
    }

    if (!user.isActive) {
      throw new AppError("User account is inactive.");
    }

    if (user.deletedAt) {
      throw new AppError("User account has been deleted.");
    }

    if (user.lockedAt) {
      throw new AppError("User account is locked.");
    }

    const passwordMatched = await verifyPassword(
      input.password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError("Invalid email or password.");
    }

    const memberships = await authRepository.findMemberships(
      user.id,
    );

    if (memberships.length === 0) {
      throw new AppError("User has no active membership.");
    }

    const membership =
      memberships.find((item) => item.isDefault) ??
      memberships[0];

    const sessionToken = generateSessionToken();

    const hashedToken = hashToken(sessionToken);

    const expiresAt = addDays(
      new Date(),
      AUTH.SESSION_EXPIRES_IN_DAYS,
    );

    await authRepository.createSession({
      userId: user.id,
      membershipId: membership.id,
      sessionToken: hashedToken,
      expiresAt,
    });

    return {
      sessionToken,
      expiresAt,
      user,
      membership,
    };
  }

  /**
   * Logout.
   */
  async logout(sessionId: string) {
    await authRepository.revokeSession(sessionId);
  }

  /**
   * Find session.
   */
  async findSession(sessionToken: string) {
    return authRepository.findSession(
      hashToken(sessionToken),
    );
  }
}

export const authService = new AuthService();