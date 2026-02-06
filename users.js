import { ROLES } from "../utils/roles";

export const users = [
  {
    id: 1,
    name: "Super Admin",
    email: "superadmin@example.com",
    role: ROLES.SUPER_ADMIN,
    department: "Administration",
    status: "Active",
  },
  {
    id: 2,
    name: "Admin User",
    email: "admin@example.com",
    role: ROLES.ADMIN,
    department: "Administration",
    status: "Active",
  },
  {
    id: 3,
    name: "Manager User",
    email: "manager@example.com",
    role: ROLES.MANAGER,
    department: "Operations",
    status: "Active",
  },
  {
    id: 4,
    name: "Support Agent",
    email: "agent@example.com",
    role: ROLES.AGENT,
    department: "Support",
    status: "Active",
  },
  {
    id: 5,
    name: "Customer User",
    email: "customer@example.com",
    role: ROLES.CUSTOMER,
    department: "NA",
    status: "Inactive",
  },
];
