
import { auth } from "@/auth"
import Header from "../ui/header"
import { SessionProvider } from "next-auth/react";



const MainLayout = async ({children}: {children: React.ReactNode}) => {
  
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <main>
        <Header/>
        {children}
      </main>
    </SessionProvider>
  )
}

export default MainLayout
