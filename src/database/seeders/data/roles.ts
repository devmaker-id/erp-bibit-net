export const roles = [
  {
    code: "SUPER_ADMIN",
    name: "Super Administrator",
    description: "Full access to the ERP system.",
    level: 100,
    sortOrder: 1,
  },
  {
    code: "ADMINISTRATOR",
    name: "Administrator",
    description: "Manage company operational data.",
    level: 80,
    sortOrder: 2,
  },
  {
    code: "USER",
    name: "User",
    description: "Standard application user.",
    level: 10,
    sortOrder: 3,
  },
] as const;