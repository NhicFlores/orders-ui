"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { InvoiceTableRow } from "@/lib/data-model/data-definitions";
import { OrderInvoice } from "@/lib/data-model/schema-definitions";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";

export const InvoiceColumns: ColumnDef<InvoiceTableRow>[] = [
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
        accessorKey: "invoice_id",
        header: ({ column }) => {
            return (
              <Button
                variant={"ghost"}
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Order Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            );
          },
          cell: ({ row }) => (
            <Link href={`/orders/${row.original.order_id}`}>
              <div className="text-blue-500">{row.original.order_name}</div>
            </Link>
          )
    }
];