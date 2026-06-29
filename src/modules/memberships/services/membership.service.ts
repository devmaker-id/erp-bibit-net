import { erpLogger } from "@/core";

import {
  ConflictError,
  NotFoundError,
} from "@/core/errors";

import type {
  CreateMembershipInput,
  DeleteMembershipInput,
  UpdateMembershipInput,
} from "../validators";

import { membershipRepository } from "../repositories";

export class MembershipService {
  async findAll() {
    return membershipRepository.findAll();
  }

  async findById(id: string) {
    const membership =
      await membershipRepository.findById(id);

    if (!membership) {
      throw new NotFoundError(
        "Membership not found."
      );
    }

    return membership;
  }

  async findByUserId(userId: string) {
    return membershipRepository.findByUserId(
      userId
    );
  }

  async create(
    data: CreateMembershipInput
  ) {
    const memberships =
      await membershipRepository.findByUserId(
        data.userId
      );

    const exists =
      memberships.find(
        (membership) =>
          membership.companyId ===
            data.companyId &&
          membership.branchId ===
            data.branchId &&
          membership.roleId ===
            data.roleId
      );

    if (exists) {
      throw new ConflictError(
        "Membership already exists."
      );
    }

    erpLogger.info(
      "Membership created.",
      data
    );

    return membershipRepository.create(
      data
    );
  }

  async update(
    data: UpdateMembershipInput
  ) {
    await this.findById(data.id);

    return membershipRepository.update(
      data
    );
  }

  async delete(
    data: DeleteMembershipInput
  ) {
    await this.findById(data.id);

    return membershipRepository.delete(
      data
    );
  }

  async restore(id: string) {
    await this.findById(id);

    return membershipRepository.restore(
      id
    );
  }
}

export const membershipService =
  new MembershipService();