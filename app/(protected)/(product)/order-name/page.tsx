import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassTypeRoute } from "@/routes";
import Link from "next/link";

export default function OrderNamePage() {
  return (
    <div className="flex items-center">
      <div className="border p-4 rounded-md bg-white space-y-4">
        <div>
          <h1 className="text-lg font-bold">Order Name</h1>
          <p className="text-muted-foreground">
            Give your order a descriptive name to stay organized
          </p>
        </div>
        <Input placeholder="Order Name" />
        <div>
          <Link href={GlassTypeRoute.href}>
            <Button>Next</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
