import type { AuthUser, CurrentMembership } from "./types";

export const auth = {
  /**
   * Authenticate user.
   */
  async login() {
    throw new Error("Not implemented.");
  },

  /**
   * Logout current session.
   */
  async logout() {
    throw new Error("Not implemented.");
  },

  /**
   * Get current authenticated user.
   */
  async user(): Promise<AuthUser | null> {
    throw new Error("Not implemented.");
  },

  /**
   * Get current active membership.
   */
  async membership(): Promise<CurrentMembership | null> {
    throw new Error("Not implemented.");
  },

  /**
   * Check permission.
   */
  async can(
    permission: string,
  ): Promise<boolean> {
    throw new Error("Not implemented.");
  },
};