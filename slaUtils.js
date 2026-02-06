import { SLA_RULES } from "./slaRules";

// Function to check if SLA is breached
export const isSlaBreached = (ticket) => {
  if (!ticket.createdAt || !ticket.priority) return false;

  const createdAt = new Date(ticket.createdAt);
  const slaHours = SLA_RULES[ticket.priority];

  if (!slaHours) return false; // fallback

  const slaEndTime = new Date(
    createdAt.getTime() + slaHours * 60 * 60 * 1000
  );

  return new Date() > slaEndTime;
};

// Optional: get SLA status string for display
export const getSlaStatus = (ticket) => {
  return isSlaBreached(ticket) ? "SLA Breached" : "Within SLA";
};