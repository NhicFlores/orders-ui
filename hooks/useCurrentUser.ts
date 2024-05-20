import { useSession } from 'next-auth/react';

//NOTE: currently not used, need to implement useSession 
export const useCurrentUser = () => {
    const session = useSession();
    
    return session.data?.user;
}