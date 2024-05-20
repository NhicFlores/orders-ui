import { useSession } from 'next-auth/react';

export const useCurrentUser = () => {
    const session = useSession();
    console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    console.log("---------------- session in hook -----------")
    console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    console.log(session)
    return session.data?.user;
}