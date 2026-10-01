export const projectTypes = ["website", "mobileApp", "customSystem", "uxui", "api", "other"] as const;
export const budgets = ["unsure", "under5k", "from5kTo15k", "from15kTo40k", "over40k"] as const;
export const timelines = ["asap", "oneToThreeMonths", "threeToSixMonths", "flexible"] as const;

export type ProjectType = (typeof projectTypes)[number];
export type Budget = (typeof budgets)[number];
export type Timeline = (typeof timelines)[number];

/** "Start Your Project" request — stored as a Project Request. */
export type ProjectRequestInput = {
  projectType: ProjectType;
  budget: Budget;
  timeline: Timeline;
  description: string;
  name: string;
  email: string;
};

/** "Send a message" — stored as a Contact Message. */
export type ContactMessageInput = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type SubmitResponse = {
  id: string;
};
