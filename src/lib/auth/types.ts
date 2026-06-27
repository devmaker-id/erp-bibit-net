export interface CurrentSession {
  userId: string;
  membershipId: string;
  sessionToken: string;
}

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string | null;
}

export interface CurrentMembership {
  id: string;

  companyId: string;
  branchId: string;
  roleId: string;

  companyName: string;
  branchName: string;
  roleName: string;
}