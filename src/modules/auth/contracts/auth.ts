export interface AuthUser {
  id: string;
  username: string | null;
  email: string;
  firstName: string;
  lastName: string | null;
  avatar: string | null;
  phone: string | null;
}

export interface AuthPermission {
  id: string;
  code: string;
  name: string;
  module: string;
  group: string;
}

export interface AuthRole {
  id: string;
  code: string;
  name: string;
  permissions: AuthPermission[];
}

export interface AuthCompany {
  id: string;
  code: string;
  name: string;
}

export interface AuthBranch {
  id: string;
  code: string;
  name: string;
}

export interface AuthMembership {
  id: string;
  company: AuthCompany;
  branch: AuthBranch;
  role: AuthRole;
  employeeNumber: string | null;
  title: string | null;
  isDefault: boolean;
}

export interface LoginSession {
  sessionToken: string;
  expiresAt: Date;
}

export interface AuthSession {
  id: string;
  expiresAt: Date;
  lastActivityAt: Date | null;
  user: AuthUser;
  membership: AuthMembership;
}

export interface LoginResult extends LoginSession {
  user: AuthUser;
  membership: AuthMembership;
}

export interface LoginActionResult {
  expiresAt: Date;
  user: AuthUser;
  membership: AuthMembership;
}
