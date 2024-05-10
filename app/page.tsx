import { Button } from "@/components/ui/button";
import SignInButton from "@/components/landing_page/sign-in-button";

//landing page 
export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center
                     bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-600 to-slate-400">
      <div className="space-y-6 text-center">
        <h1 className="text-semibold text-6xl text-white drop-shadow-md">Welcome!</h1>
        <p className="text-white text-lg">Sign in to order some glass</p>
        <div>
          <SignInButton>
            <Button variant="secondary" size="lg">
              Sign in
            </Button>
          </SignInButton>
        </div>
      </div>
    </main>
  );
}

/*
 className="flex flex-col h-screen"
 */