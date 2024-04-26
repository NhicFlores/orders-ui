import Homepage_NavLinks from "./ui/components/homepage_navlinks";
import Header from "./ui/header";
import { ProfileNavBar } from "./ui/profile_nav_bar";

//home page for app
export default function Home() {
  return (
    <main className="flex flex-col place-items-center h-screen">
      <div>
        <Header />
      </div>

      <div className="mt-30 grid text-center sm:mt-10 lg:mb-0 lg:mt-30 lg:w-auto lg:max-w-5xl lg:grid-rows-3 lg:text-left">
        <Homepage_NavLinks />
      </div>
    </main>
  );
}

/*
 
old header div styling : className="z-10 w-auto max-w-5xl items-center justify-between text-sm lg:flex"

old main styling : className="flex min-h-screen flex-col items-center justify-between p-24"
 */