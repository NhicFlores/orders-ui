import { Button } from "@/components/ui/button";
import SignInButton from "@/components/landing_page/sign-in-button";

//home page for app
export default function Home() {
  return (
    //Set main screen layout to not be locked to center page --tdh 4/26/24
    <main className="flex h-full flex-col items-center justify-center">
      <div className="mt-96">
        <SignInButton>
          <Button>
            Sign in
          </Button>
        </SignInButton>
      </div>
    </main>
  );
}

/*
 className="flex flex-col h-screen"
 */