import { Button } from "@/components/ui/button";
import { deleteShippingInfo } from "@/lib/actions/profile-actions";
import { ShippingInfo } from "@/lib/definitions/profile-definitions";
import { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";

//NOTE TODO: need cell formatting
export const ShippingColumns: ColumnDef<ShippingInfo>[] = [
    {
        id: 'expander',
    },
    {
        accessorKey: 'is_job_site',
        header: 'Job Site',
    },
    {
        accessorKey: 'delivery_addr.street',
        header: 'Street',
    },
    {
        accessorKey: 'delivery_addr.city',
        header: 'City',
    },
    {
        accessorKey: 'delivery_addr.state',
        header: 'State',
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const shippingInfo = row.original;
            return (
                <Button
                    variant={'ghost'}
                    onClick={() => deleteShippingInfo(shippingInfo.id!)}
                >
                    <Trash2 size={18} />
                </Button>
            );
        },
    },
];