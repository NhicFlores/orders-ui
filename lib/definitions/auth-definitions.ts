export type User = {
  id: string;
  email: string;
  emailVerified?: string;
  password: string;
  role: Role;
};

//role definition
export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

//CREATE TYPE role AS ENUM ('USER', 'ADMIN');
// UNUSED 
export type Account = {
  id: string;
  userID: string;
  type: string;
  refresh_token: string;
  access_token: string;
  token_type: string;
  session_state: string;
  //scope: string;
  //expiresAt: string;
  //provider: string;
  //providerAccountId: string;
};
// UNUSED 
export type Session = {
  id: string;
  sessionToken: string;
  userId: string;
  expiresAt: string;
};
// used for email verification and password reset
// instead of generating a UUID, hash the users email
// to generate a unique token
// UNUSED 
export type VerificationToken = {
  id: string;
  email: string;
  token: string;
  expireAt: string;
};
