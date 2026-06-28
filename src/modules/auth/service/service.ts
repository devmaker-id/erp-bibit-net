import { addDays } from "date-fns";

import {
  AppError,
  UnauthorizedError,
} from "@/core/errors";

import {
  AUTH,
  generateSessionToken,
  hashToken,
  verifyPassword,
} from "@/lib/auth";

import { authRepository } from "../repository";
import type {
  AuthMembership,
  AuthSession,
  AuthUser,
  LoginResult,
} from "../contracts";
import type { LoginInput } from "../validation";

export class AuthService {
  async login(input: LoginInput): Promise<LoginResult> {
    const user = await authRepository.findUserByEmail(input.email);

    if (!user) {
      throw new UnauthorizedError("Invalid email or password.");
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
      throw new UnauthorizedError("Invalid email or password.");
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
      user: this.toAuthUser(user),
      membership: this.toAuthMembership(membership),
    };
  }

  async logout(sessionId: string) {
    await authRepository.revokeSession(sessionId);
  }

  async logoutByToken(sessionToken: string) {
    await authRepository.revokeSessionByToken(
      hashToken(sessionToken),
    );
  }

  async findSession(sessionToken: string): Promise<AuthSession | null> {
    const session = await authRepository.findSession(hashToken(sessionToken));

    if (!session) {
      return null;
    }

    if (
      !session.user.isActive ||
      session.user.deletedAt ||
      !session.membership.isActive ||
      session.membership.resignedAt ||
      !session.membership.company.isActive ||
      session.membership.company.deletedAt ||
      !session.membership.branch.isActive ||
      session.membership.branch.deletedAt ||
      !session.membership.role.isActive ||
      session.membership.role.deletedAt
    ) {
      return null;
    }

    await authRepository.touchSession(session.id);

    return {
      id: session.id,
      expiresAt: session.expiresAt,
      lastActivityAt: session.lastActivityAt,
      user: this.toAuthUser(session.user),
      membership: this.toAuthMembership(session.membership),
    };
  }

  private toAuthUser(user: {
    id: string;
    username: string | null;
    email: string;
    firstName: string;
    lastName: string | null;
    avatar: string | null;
    phone: string | null;
  }): AuthUser {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar,
      phone: user.phone,
    };
  }

  private toAuthMembership(membership: {
    id: string;
    employeeNumber: string | null;
    title: string | null;
    isDefault: boolean;
    company: {
      id: string;
      code: string;
      name: string;
    };
    branch: {
      id: string;
      code: string;
      name: string;
    };
    role: {
      id: string;
      code: string;
      name: string;
      rolePermissions: Array<{
        permission: {
          id: string;
          code: string;
          name: string;
          module: string;
          group: string;
          isActive: boolean;
          deletedAt: Date | null;
        };
      }>;
    };
  }): AuthMembership {
    return {
      id: membership.id,
      employeeNumber: membership.employeeNumber,
      title: membership.title,
      isDefault: membership.isDefault,
      company: {
        id: membership.company.id,
        code: membership.company.code,
        name: membership.company.name,
      },
      branch: {
        id: membership.branch.id,
        code: membership.branch.code,
        name: membership.branch.name,
      },
      role: {
        id: membership.role.id,
        code: membership.role.code,
        name: membership.role.name,
        permissions: membership.role.rolePermissions
          .map((item) => item.permission)
          .filter((permission) => permission.isActive && !permission.deletedAt)
          .map((permission) => ({
            id: permission.id,
            code: permission.code,
            name: permission.name,
            module: permission.module,
            group: permission.group,
          })),
      },
    };
  }
}

export const authService = new AuthService();
