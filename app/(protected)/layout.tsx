import Header from "../ui/header";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //NOTE TODO: create context to provide session data to all children
  return (
    <div className="flex 
                    flex-col 
                    min-h-screen"
                    >
      <div className="sticky top-0 z-50">
        <Header />
      </div>
      <main className="overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
