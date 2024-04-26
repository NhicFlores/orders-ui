import Homepage_NavLinks from "./ui/components/homepage_navlinks";
import Header from "./ui/header";

//home page for app
export default function Home() {
  return (
    //Set main screen layout to not be locked to center page --tdh 4/26/24
    <main className="flex flex-col h-screen">
      <div>
        <Header />
      </div>

      <div className="mt-30 grid text-center sm:mt-10 lg:mb-0 lg:mt-30 lg:w-auto lg:max-w-10xl lg:grid-rows-3 lg:text-center">
        <Homepage_NavLinks />
      </div>
    </main>
  );
}

/*
 
old header div styling : className="z-10 w-auto max-w-5xl items-center justify-between text-sm lg:flex"

old main styling : className="flex min-h-screen flex-col items-center justify-between p-24"
 */