import Homepage_NavLinks from "./ui/components/homepage_navlinks";

//home page for app
export default function Home() {
  return (
    //Set main screen layout to not be locked to center page --tdh 4/26/24
    <main>
      <div className="mt-30 grid text-center sm:mt-10 lg:mb-0 lg:mt-30 lg:w-auto lg:max-w-10xl lg:grid-rows-3 lg:text-center">
        <Homepage_NavLinks />
      </div>
    </main>
  );
}

/*
 className="flex flex-col h-screen"
 */