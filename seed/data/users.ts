import { User } from "@/lib/data-model/schema-types";

export const usersSeed: User[] = [
  {
    "id": "7deef9f5-09fb-4249-ada6-ac9f9df8a01b",
    "email": "too.feathers@example.com",
    "password": "181jv8",
    "role": "ADMIN",
    "is_active": true
  },
  {
    "id": "650b6c41-dc96-4a9e-bf32-d1f76d393953",
    "email": "call.pitch@example.com",
    "password": "cc7pmy",
    "role": "ADMIN",
    "is_active": true
  },
  {
    "id": "a3f34e72-38f7-4630-bab1-5b687303d5f7",
    "email": "street.nodded@example.com",
    "password": "5gzej5",
    "role": "USER",
    "is_active": true
  },
  {
    "id": "133dfe73-be72-4a4c-8b2a-937186db9700",
    "email": "stretch.stuck@example.com",
    "password": "qnch3p",
    "role": "USER",
    "is_active": true
  },
  {
    "id": "67b43cdf-0baf-4bb4-a107-aa3a729148ae",
    "email": "solution.stranger@example.com",
    "password": "pvjfae",
    "role": "ADMIN",
    "is_active": true
  }
];
