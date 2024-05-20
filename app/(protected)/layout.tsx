import Header from "../ui/header"


export default async function MainLayout ({children}: {children: React.ReactNode}) {
  //NOTE TODO: create context to provide session data to all children
  return (
      <main>
        <Header/>
        {children}
      </main>
  )
}

