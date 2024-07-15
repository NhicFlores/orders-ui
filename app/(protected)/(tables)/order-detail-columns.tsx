import { ColumnDef } from "@tanstack/react-table";
import { OrderDB } from "@/lib/definitions/order-definitions";

export const OrderDetailColumns: ColumnDef<OrderDB>[] = [
    {
        id: "expander",
    },
    {
        accessorKey: ""
    }
];