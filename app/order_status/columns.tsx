//client component containing column definitions
"use client";

import { ColumnDef, RowExpanding } from "@tanstack/react-table";
import { Order } from "../lib/definitions";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

/*export type Order = {
  id: string;
  customer_id: string;
  order_name: string;
  product_id: string;
  amount: number;
  price: number;
  date: string;
  status: "pending" | "draft" | "shipped" | "processing";
};*/

export const order_table_columns: ColumnDef<Order>[] = [
  {
    id: 'actions',
    cell: ({ row }) => {
      const order = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={'ghost'} className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4"/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(order.id)}>
              Copy order ID
            </DropdownMenuItem>
            <DropdownMenuSeparator/>
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View product details</DropdownMenuItem>
            <DropdownMenuSeparator/>
            <DropdownMenuItem className="focus:bg-red-500 focus:text-white">Delete Order</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "customer_id",
    header: "Customer",
  },
  {
    accessorKey: "order_name",
    header: "Order Name",
  },
  {
    accessorKey: "product_id",
    header: "Product",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "price",
    header: () => <div className="text-right">Total</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: 'currency',
        currency: 'USD',
      }).format(price);
      return <div className="text-right font-medium">{formatted}</div>
    }
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
