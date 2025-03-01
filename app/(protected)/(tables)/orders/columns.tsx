//client component containing column definitions
"use client";

import { ColumnDef } from "@tanstack/react-table";
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
import { OrderTableRow } from "@/lib/data-model/query-types";
import { statusColumnFilter } from "@/lib/table-utils";
import { OrderDetailsRoute } from "@/routes";

//TODO: enable shift select
export const OrderColumns: ColumnDef<OrderTableRow>[] = [
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
              onClick={() => navigator.clipboard.writeText(order.order_id)}
            >
              Copy order ID
            </DropdownMenuItem>
            <Link href={`/order/${order.order_id}/edit`}>
              <DropdownMenuItem>Edit Order</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View product details</DropdownMenuItem>
            <DropdownMenuSeparator />
            {/** RESEARCH NOTE: Server Actions are not limited to <form> and can be invoked from event handlers, useEffect, third-party libraries, and other form elements like <button> **/}

            <DropdownMenuItem
              onClick={() => deleteOrder(order.order_id)}
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
    cell: ({ row }) => {
      return (
        <Link href={OrderDetailsRoute(row.original.order_id).href}>
          <div>{row.original.order_name}</div>
        </Link>
      );
    },
  },
  {
    accessorKey: "ordered_by",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ordered By
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
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
    cell: ({ row }) => {
      const status = row.original.status;
      return <div>{status}</div>;
    },
    // set the filter function for the status column
    filterFn: statusColumnFilter, // (row, columnId, filterValue) => {
    //   return row.original.status === filterValue ? false : true;
    // }
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = row.original.amount;
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return <div>{formatted}</div>;
    },
    // filterFn: ({ row, })
  },
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
      const date = row.original.date_submitted; // RESEARCH NOTE: casting vs conversion
      // RESEARCH NOTE: format date before sending to db vs formatting on fetch
      const cellData = date ? formatDateToLocal(new Date(date)) : "N/A";
      return <div>{cellData}</div>;
    },
    // TODO NOTE: define sorting function for date columns that look at status to determine sorting
  },
  {
    accessorKey: "date_updated",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date Updated
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.original.date_updated; // RESEARCH NOTE: casting vs conversion
      // RESEARCH NOTE: format date before sending to db vs formatting on fetch
      const formattedDate = formatDateToLocal(new Date(date));
      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "date_shipped",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date Shipped
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.original.date_shipped;
      const cellData = date ? formatDateToLocal(new Date(date)) : "N/A";
      return <div>{cellData}</div>;
    },
  },
  {
    accessorKey: "date_delivered",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date Delivered
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.original.date_delivered;
      const cellData = date ? formatDateToLocal(new Date(date)) : "N/A";
      return <div>{cellData}</div>;
    },
  },
];
