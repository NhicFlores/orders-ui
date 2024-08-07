export type User = {
  id: string;
  email: string;
  emailVerified: string;
  password: string;
  role: Role;
};
//optional fields
//Accounts: Account[];
//Sessions: Session[];

//role definition
export enum Role {
  USER,
  ADMIN,
}

//CREATE TYPE role AS ENUM ('USER', 'ADMIN');

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

export type Session = {
  id: string;
  sessionToken: string;
  userId: string;
  expiresAt: string;
};
// used for email verification and password reset
// instead of generating a UUID, hash the users email
// to generate a unique token
export type VerificationToken = {
  id: string;
  email: string;
  token: string;
  expireAt: string;
};
