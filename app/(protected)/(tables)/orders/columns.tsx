//client component containing column definitions
"use client";

import { ColumnDef, RowExpanding } from "@tanstack/react-table";
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
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { deleteOrder } from "@/lib/actions/actions";
import { formatDateToLocal } from "@/lib/utils";
import { Order, OrderStatus } from "@/lib/definitions/data-model";
//TODO: enable shift select

// NOT TODO: this may be a temporary type definition
export type OrderTableData = {
  order_id: string;
  order_name: string;
  status: OrderStatus;
  shipping_info: string;
  date_created: string;
  date_updated: string;
  date_submitted: string;
  billing_info: {
    street: string;
    apt_num: string;
    city: string;
    state: string;
    zip: string;
    payment_method: string;
    purchase_order: string;
    primary_contact_name: string;
    primary_contact_email: string;
    phone_num: string;
    alt_phone_num: string;
    fax_num: string;
    isPrimary: boolean;
    isActive: boolean;
  };
  order_items: {
    id: string;
    product_config: string;
    quantity: number;
    note: string;
  }[];
};

export const OrderColumns: ColumnDef<Order>[] = [
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
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;
      //const deleteOrderWithId = deleteOrder.bind(null, order.order_id);
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(order.id)}
            >
              Copy order ID
            </DropdownMenuItem>
            <Link href={`/order/${order.id}/edit`}>
              <DropdownMenuItem>Edit Order</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View product details</DropdownMenuItem>
            <DropdownMenuSeparator />
            {/** NOTE HOW TO Server Actions are not limited to <form> and can be invoked from event handlers, useEffect, third-party libraries, and other form elements like <button> **/}

            <DropdownMenuItem
              onClick={() => deleteOrder(order.id)}
              className="focus:bg-red-500 focus:text-white"
            >
              Delete Order
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  // {
  //   accessorKey: "id",
  //   header: "ID",
  // },
  {
    accessorKey: "order_name",
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
  },
  // {
  //   accessorKey: "product_id",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant={"ghost"}
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Product
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  // },
  // {
  //   accessorKey: "quantity",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant={"ghost"}
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Quantity
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  // },
  // {
  //   accessorKey: "price",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant={"ghost"}
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         <div className="text-right">Total</div>
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  //   cell: ({ row }) => {
  //     const price = parseFloat(row.getValue("price"));
  //     const formatted = new Intl.NumberFormat("en-US", {
  //       style: "currency",
  //       currency: "USD",
  //     }).format(price);
  //     return <div className="text-right pr-5 font-medium">{formatted}</div>;
  //   },
  // },
  {
    accessorKey: "date_submitted",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date Ordered
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue("date_submitted"); //NOTE TO DO: casting vs conversion
      // NOTE TODO: format date before sending to db vs formatting on fetch
      const formattedDate = formatDateToLocal(date as string);
      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];
