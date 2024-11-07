import { Order } from "@/lib/data-model/schema-definitions";
import { ColumnDef } from "@tanstack/react-table";

export const OrderDetailColumns: ColumnDef<Order>[] = [
  {
    id: "expander",
  },
  {
    accessorKey: "",
  },
];
