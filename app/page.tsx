import Homepage_NavLinks from "./ui/components/homepage_navlinks";
import Header from "./ui/header";
import { ProfileNavBar } from "./ui/profile_nav_bar";

//home page for app
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-auto max-w-5xl items-center justify-between text-sm lg:flex">
        <Header />
      </div>

      <div className="mb-32 grid pb-40 text-center lg:mb-0 lg:w-auto lg:max-w-5xl lg:grid-rows-3 lg:text-left">
        <Homepage_NavLinks />
      </div>
    </main>
  );
}
