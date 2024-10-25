import { Order } from "@/lib/definitions/data-model";
import { ColumnDef } from "@tanstack/react-table";

export const OrderDetailColumns: ColumnDef<Order>[] = [
    {
        id: "expander",
    },
    {
        accessorKey: ""
    }
];