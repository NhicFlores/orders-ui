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
import { Profile } from "@/app/lib/routes";
//get images into public
const ProfileButton = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex bg-primary rounded text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
          <UserRound className="w-6 h-6"/>
          <Link href={Profile.href} className="text-sm pl-2">
            Account
          </Link>
        </div>

      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <Link href={Profile.href} className="text-sm">
            {Profile.label}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">Billing</DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">Log Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileButton;
