import type { HttpMethod } from "~/utils/enums/enums";

export type Policy = {
  _id: string;
  policyGroupId: string;
  policyKey: string;
  name: string;
  endpoint: string;
  method: HttpMethod;
  description?: string;
  userIds: string[];
  userGroupIds: string[];
  isPublic: boolean;
  blockedUserGroupIds?: string[];
  blockedUserIds?: string[];
  createdAt: string;
  updatedAt: string;
};
