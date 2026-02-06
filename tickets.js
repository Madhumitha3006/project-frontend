export const tickets = [
  {
    id: 1,
    title: "Login issue",
    description: "User unable to login with correct credentials",
    status: "Open",
    priority: "High", // SLA uses this
    assignedTo: "Agent 1",
    createdBy: "User 101",
    createdAt: "2026-01-10T08:00:00", // IMPORTANT (date + time)
    messages: [
      {
        id: 1,
        text: "Issue reported by user",
        isInternal: false,
      },
    ],
    attachments: [],
  },

  {
    id: 2,
    title: "Page not loading",
    description: "Dashboard page keeps loading",
    status: "Closed",
    priority: "Medium", // SLA uses this
    assignedTo: "Agent 2",
    createdBy: "User 102",
    createdAt: "2026-01-11T10:30:00",
    messages: [],
    attachments: [],
  },

  {
    id: 3,
    title: "Feature request",
    description: "Need export option in report",
    status: "Open",
    priority: "Low", // SLA uses this
    assignedTo: "Unassigned",
    createdBy: "User 103",
    createdAt: "2026-01-12T09:00:00",
    messages: [],
    attachments: [],
  },
];
export default tickets;