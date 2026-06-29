import { prisma } from "@/database";

import { MembershipsPage } from "@/modules/memberships/components";
import { membershipService } from "@/modules/memberships/services";

export default async function MembershipsPageRoute() {
  const [
    memberships,
    usersResult,
    companies,
    branches,
    roles,
  ] = await Promise.all([
    membershipService.findAll(),

    prisma.user.findMany({
      where: {
        isActive: true,
        deletedAt: null,
      },
      orderBy: [
        {
          firstName: "asc",
        },
        {
          lastName: "asc",
        },
      ],
      select: {
        id: true,
        firstName: true,
        lastName: true,
      },
    }),

    prisma.company.findMany({
      where: {
        isActive: true,
        deletedAt: null,
      },
      orderBy: {
        name: "asc",
      },
      select: {
        id: true,
        name: true,
      },
    }),

    prisma.branch.findMany({
      where: {
        isActive: true,
        deletedAt: null,
      },
      orderBy: {
        name: "asc",
      },
      select: {
        id: true,
        name: true,
      },
    }),

    prisma.role.findMany({
      where: {
        isActive: true,
        deletedAt: null,
      },
      orderBy: [
        {
          level: "asc",
        },
        {
          sortOrder: "asc",
        },
        {
          name: "asc",
        },
      ],
      select: {
        id: true,
        name: true,
      },
    }),
  ]);

  const users = usersResult.map((user) => ({
    id: user.id,
    name: user.lastName
      ? `${user.firstName} ${user.lastName}`
      : user.firstName,
  }));

  return (
    <MembershipsPage
      memberships={memberships}
      users={users}
      companies={companies}
      branches={branches}
      roles={roles}
    />
  );
}