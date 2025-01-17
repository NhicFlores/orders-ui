import { User, UserRole } from "@/lib/data-model/schema-definitions";

export const usersSeed: User[] = [
  {
    id: "a4c65538-760f-49da-8172-44dbfc085b1f",
    email: "meat.nor@example.com",
    password: "19hk5",
    role: UserRole.Admin,
    is_active: true
  },
  {
    id: "e404c268-6752-4e2f-b689-30408ad7da55",
    email: "aloud.source@example.com",
    password: "ccnh0m",
    role: UserRole.Admin,
    is_active: true
  },
  {
    id: "e9df3197-f525-4f7c-a250-ab572a00012b",
    email: "remove.exclaimed@example.com",
    password: "v0nqn",
    role: UserRole.Admin,
    is_active: true
  },
  {
    id: "658888e7-9bf9-4b06-94e1-483afef202ed",
    email: "better.poor@example.com",
    password: "bxm3gk",
    role: UserRole.Admin,
    is_active: true
  },
  {
    id: "39ccfb9f-717d-48b8-ac06-ca325d137a1b",
    email: "drove.regular@example.com",
    password: "hk35nb",
    role: UserRole.User,
    is_active: true
  }
];
