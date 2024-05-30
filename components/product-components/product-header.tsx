import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

interface ProductHeaderProps {
  title: string;
  backRoute?: string;
  continueRoute: string;
}

const ProductHeader = ({
  title,
  backRoute,
  continueRoute,
}: ProductHeaderProps) => {
  return (
    <div className="flex justify-between">
      <div>
        {backRoute && (
          <Button variant={"outline"} asChild>
            <Link href={backRoute}>Back</Link>
          </Button>
        )}
      </div>
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <Button asChild>
        <Link href={continueRoute}>Continue</Link>
      </Button>
    </div>
  );
};

export default ProductHeader;
