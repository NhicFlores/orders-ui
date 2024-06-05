"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { BillingInfo } from "@/lib/definitions/profile-definitions";
import { ColumnDef } from "@tanstack/react-table";

export const BillingInfoColumns: ColumnDef<BillingInfo>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="select row"
            />
        ),
    },
    { 
        accessorKey: "payment_method",
        header: "Payment Method",
    },
    {
        accessorKey: "purchase_order",
        header: "Purchase Order",
    },
    {
        accessorKey: "primary_contact_name",
        header: "Primary Contact Name",
    },
    {
        accessorKey: "isActive",
        header: "isActive",
    }
];