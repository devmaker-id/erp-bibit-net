import { addDays } from "date-fns";

import { AppError } from "@/core/errors";

import { AUTH } from "@/lib/auth/constants";
import { verifyPassword } from "@/lib/auth/password";
import {
  generateSessionToken,
  hashToken,
} from "@/lib/auth/token";

import { authRepository } from "../repository";

interface LoginInput {
  email: string;
  password: string;

  ipAddress?: string;
  userAgent?: string;
}

export class AuthService {
  /**
   * Login user.
   */
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

    if (user.deletedAt) {
      throw new AppError("User account has been deleted.");
    }

    if (user.lockedAt) {
      throw new AppError("User account is locked.");
    }

    const passwordMatched = await verifyPassword(
      password,
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

    const session = await authRepository.createSession({
      userId: user.id,
      membershipId: membership.id,
      sessionToken: hashedToken,

      expiresAt,

      ipAddress,
      userAgent,
    });

    await authRepository.touchSession(session.id);

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
   * Current user.
   */
  async me(userId: string) {
    return authRepository.findUserById(userId);
  }

  /**
   * Current session.
   */
  async session(sessionToken: string) {
    return authRepository.findSession(
      hashToken(sessionToken),
    );
  }
}

export const authService = new AuthService();