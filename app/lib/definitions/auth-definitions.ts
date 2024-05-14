export type User = {
    id: string;
    name: string;
    email: string;
    emailVerified: string;
    password: string;
    role: Role;
    Accounts: Account[];
    //Sessions: Session[];
  };

//role definiton 
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
}

export type Session = {
    id: string; 
    sessionToken: string; 
    userId: string;
    expiresAt: string;
}
