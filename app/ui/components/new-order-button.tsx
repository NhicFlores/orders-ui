import Link from "next/link";
import { NewOrderRoute } from "@/routes";

export function NewOrderButton() {
    return (
      <Link
        href={NewOrderRoute.href}
        className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        <span className="hidden md:block">{NewOrderRoute.label}</span>{' '}
      </Link>
    );
  }