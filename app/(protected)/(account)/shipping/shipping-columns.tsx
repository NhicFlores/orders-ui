import { Button } from "@/components/ui/button";
import { deleteShippingInfo } from "@/lib/actions/profile-actions";
import { CustomerShippingInformation } from "@/lib/data-model/schema-definitions";
import { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";

//TODO NOTE: need cell formatting
export const ShippingColumns: ColumnDef<CustomerShippingInformation>[] = [
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
          onClick={() => deleteShippingInfo(shippingInfo.shipping_info_id!)}
        >
          <Trash2 size={18} />
        </Button>
      );
    },
  },
];
