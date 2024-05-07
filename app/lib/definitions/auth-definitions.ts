export type User = {
    id: string;
    name: string;
    email: string;
    //emailVerified: string;
    password: string;
    Accounts: Account[];
    Sessions: Session[];
  };

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