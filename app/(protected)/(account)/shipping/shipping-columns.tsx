import { Button } from "@/components/ui/button";
import { deleteShippingInfo } from "@/lib/actions/profile-actions";
import { UserShippingInformation } from "@/lib/definitions/data-model";
import { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";

//NOTE TODO: need cell formatting
export const ShippingColumns: ColumnDef<UserShippingInformation>[] = [
  {
    id: "expander",
  },
  {
    accessorKey: "is_job_site",
    header: "Job Site",
  },
  {
    accessorKey: "street",
    header: "Street",
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "state",
    header: "State",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const shippingInfo = row.original;
      return (
        <Button
          variant={"ghost"}
          onClick={() => deleteShippingInfo(shippingInfo.id!)}
        >
          <Trash2 size={18} />
        </Button>
      );
    },
  },
];
