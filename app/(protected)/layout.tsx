import { SessionProvider } from "next-auth/react"
import Header from "../ui/header"
import { auth } from "@/auth"


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
