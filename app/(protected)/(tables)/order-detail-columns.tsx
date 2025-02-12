// DEPRECATED
import { Order } from "@/lib/data-model/schema-types";
import { ColumnDef } from "@tanstack/react-table";

export const OrderDetailColumns: ColumnDef<Order>[] = [
  {
    id: "expander",
  },
  {
    accessorKey: "",
  },
];
