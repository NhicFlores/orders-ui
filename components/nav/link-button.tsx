import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";

interface LinkButtonProps {
  href: string;
  label: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

const linkButtonVariants = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  destructive:
    "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  outline:
    "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  link: "text-primary underline-offset-4 hover:underline",
};

const linkButtonSizes = {
  default: "h-10 px-4 py-2",
  sm: "h-9 rounded-md px-3",
  lg: "h-11 rounded-md px-8",
  icon: "h-10 w-10",
};
// note: need to conditionally render an icon 
// 'as?' property can be used to pass URL decorator for the URL that will be shown in the browser 
const LinkButton = ({
  href,
  label,
  variant = "default",
  size = "default",
  className,
}: LinkButtonProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        linkButtonVariants[variant],
        linkButtonSizes[size],
        className
    )}
    >
      {label}
    </Link>
  );
};

export default LinkButton;
