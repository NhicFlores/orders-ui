"use client";
import { Button } from "@/components/ui/button";
import { deleteBillingInfo } from "@/lib/actions/profile-actions";
import { BillingInfoDB } from "@/lib/definitions/profile-definitions";
import { ColumnDef } from "@tanstack/react-table";
import { Trash2, ChevronDown  } from "lucide-react";

export const BillingInfoColumns: ColumnDef<BillingInfoDB>[] = [
    {
        id: "expander",
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
        id: "actions",
        cell: ({ row }) => {
            const billingInfo = row.original;
            return (
                <Button 
                    variant={'ghost'}
                    onClick={() => deleteBillingInfo(billingInfo.user_id , billingInfo.id)}
                >
                    <Trash2 size={18} />
                </Button>
            );
        },
    },
];