//client component containing column definitions
"use client";

import { ColumnDef, RowExpanding } from "@tanstack/react-table";
import { Order } from "../lib/definitions/definitions";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { table } from "console";
import Link from "next/link";
import { deleteOrder } from "../lib/actions";

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
//TODO: enable shift select 
export const order_table_columns: ColumnDef<Order>[] = [
  {
    id: 'select',
    header: ({table}) => (
      <Checkbox 
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="select row"
        />
    )
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const order = row.original
      const deleteOrderWithId = deleteOrder.bind(null, order.id);
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
            <DropdownMenuItem>
              <Link href={`/order/${order.id}/edit`}>
                Edit Order
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator/>
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View product details</DropdownMenuItem>
            <DropdownMenuSeparator/>
            {/** NOTE HOW TO Server Actions are not limited to <form> and can be invoked from event handlers, useEffect, third-party libraries, and other form elements like <button> **/}
            <form action={deleteOrderWithId}>
              <DropdownMenuItem className="focus:bg-red-500 focus:text-white">Delete Order</DropdownMenuItem>
            </form>
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
    header: ({ column }) => {
      return (
        <Button variant={'ghost'} onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Customer
          <ArrowUpDown className="ml-2 h-4 w-4"/>
        </Button>
      )
    },
  },
  {
    accessorKey: "order_name",
    header: ({ column }) => {
      return (
        <Button variant={'ghost'} onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Order Name
          <ArrowUpDown className="ml-2 h-4 w-4"/>
        </Button>
      )
    },
  },
  {
    accessorKey: "product_id",
    header: ({ column }) => {
      return (
        <Button variant={'ghost'} onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Product
          <ArrowUpDown className="ml-2 h-4 w-4"/>
        </Button>
      )
    },
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return (
        <Button variant={'ghost'} onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Quantity
          <ArrowUpDown className="ml-2 h-4 w-4"/>
        </Button>
      )
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button variant={'ghost'} onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          <div className="text-right">Total</div>
          <ArrowUpDown className="ml-2 h-4 w-4"/>
        </Button>
      )
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: 'currency',
        currency: 'USD',
      }).format(price);
      return <div className="text-right pr-5 font-medium">{formatted}</div>
    }
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button variant={'ghost'} onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Date
          <ArrowUpDown className="ml-2 h-4 w-4"/>
        </Button>
      )
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button variant={'ghost'} onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Status
          <ArrowUpDown className="ml-2 h-4 w-4"/>
        </Button>
      )
    },
  },
];
