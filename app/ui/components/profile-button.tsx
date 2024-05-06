import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserRound } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Profile, Login } from "@/app/lib/routes";
//get images into public 
// NOTE TODO: remove link from dropdown trigger and replace with account button 
const ProfileButton = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex bg-primary rounded text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
          <UserRound className="w-6 h-6"/>
          <div className="text-sm pl-2">
            Account
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={Profile.href} className="text-sm">
          <DropdownMenuItem className="cursor-pointer">
            {Profile.label}
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem className="cursor-pointer">Billing</DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <Link href={Login.href}>
          <DropdownMenuItem className="cursor-pointer">Log Out</DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileButton;
