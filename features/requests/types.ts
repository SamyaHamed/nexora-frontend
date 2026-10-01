import type { ProjectRequestInput } from "@/features/contact/types";

export const requestStatuses = ["new", "inReview", "quoted", "accepted", "declined"] as const;

export type RequestStatus = (typeof requestStatuses)[number];

/** A "Start your project" submission, as stored. */
export type ProjectRequest = ProjectRequestInput & {
  id: string;
  status: RequestStatus;
  createdAt: string;
};
