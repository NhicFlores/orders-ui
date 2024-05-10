"use client";
import { Login } from "@/app/lib/routes";
import { useRouter } from "next/navigation";


interface SignInButtonProps {
    children: React.ReactNode;
    mode?: 'modal' | 'redirect';
    asChild?: boolean;
}

const SignInButton = ({children, mode = 'redirect', asChild}: SignInButtonProps) => {
    const router = useRouter();
    //NOTE: router vs links vs redirect 
    const onClick = () => {
        console.log("SIGN IN BUTTON CLICKED");
        router.push(Login.href);
    }

    if (mode === "modal") {
        return (
            <span>
                TODO: Implement modal
            </span>
        )
    }
  
    return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  )
}

export default SignInButton