import Container from "./components/page-container";
import Link from "next/link";
import { Dashboard, HeaderRoutes, Profile } from "../lib/routes";
import { Button } from "@/components/ui/button";
import ProfileButton from "./components/profile-button";

//might need to install previous version of lucide npm i lucide-react@0.263.1 if this version is still having issues
export default function Header() {
  return (
    <header className="sm:flex sm:justify-between py-3 border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between w-full">
          <div className="flex items-center">
            <Link href={Dashboard.href} className="ml-4 lg:ml-0">
              <h1 className="text-xl font-bold">{Dashboard.label}</h1>
            </Link>
          </div>
          <nav className="mx-6 flex items-center space-x-4 lg:space-x-6 md:block">
            {HeaderRoutes.map((route, i) => (
              <Button key={i} asChild variant={"ghost"}>
                <Link
                  key={i}
                  href={route.href}
                >
                  <h2 className="text-lg font-medium transition-colors">
                    {route.label}
                  </h2>
                </Link>
              </Button>
            ))}
          </nav>
          <div>
            <ProfileButton/>
          </div>
        </div>
      </Container>
    </header>
  );
}

/*
            <Button>
              <UserRound/>
              <Link href={Profile.href} className="text-sm pl-2">
                {Profile.label}
              </Link>
            </Button>
*/