"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserRound } from "lucide-react";
import Link from "next/link";
import { ProfileRoute } from "@/routes";
import { logOut } from "@/app/lib/auth-actions/auth-actions";
//get images into public
// NOTE TODO: remove link from dropdown trigger and replace with account button
const ProfileButton = () => {
  async function onLogoutClick() {
    console.log("---------- LOGOUT CLICKED ------------");
    await logOut();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center bg-primary rounded text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
          <UserRound className="w-5" />
          <div className="text-sm pl-2">Account</div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={ProfileRoute.href} className="text-sm">
          <DropdownMenuItem className="cursor-pointer">
            {ProfileRoute.label}
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem className="cursor-pointer">Billing</DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogoutClick} className="cursor-pointer">
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileButton;
