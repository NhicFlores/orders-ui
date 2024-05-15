import Header from "../ui/header"

const MainLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <main >
      <Header/>
      {children}
    </main>
  )
}

export default MainLayout
