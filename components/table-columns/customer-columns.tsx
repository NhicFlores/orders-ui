"use client";
import { Button } from "@/components/ui/button";
import { CustomerTableRow, ItemTableRow } from "@/lib/data-model/query-types";
import { formatDateStringToLocal, formatDateToLocal } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";

export const CustomerColumns: ColumnDef<CustomerTableRow>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "account_num",
    header: "Account Number",
    cell: ({ row }) => {
      const { account_num } = row.original;
      return (
        <div>
          {account_num}
        </div>
      );
    },
  },
  {
    accessorKey: "credit_status",
    header: "Credit Status",
    cell: ({ row }) => {
      const { credit_status } = row.original;
      return (
        <div>
          {credit_status}
        </div>
      );
    },
  },
  {
    accessorKey: "unpaid_invoice_count",
    header: "Unpaid Invoices",
    cell: ({ row }) => {
      const { unpaid_invoice_count } = row.original;
      return (
        <div>
          {unpaid_invoice_count}
        </div>
      );
    }
  },
  {
    accessorKey: "balance",
    header: "Balance",
    cell: ({ row }) => {
      const { balance } = row.original;
      return (
        <div>
          ${balance.toFixed(2)}
        </div>
      );
    },
  },
  {
    accessorKey: "order_count",
    header: "Number of Orders",
    cell: ({ row }) => {
      const { order_count } = row.original;
      return (
        <div>
          {order_count}
        </div>
      );
    }
  },
  {
    accessorKey: "latest_order_date",
    header: "Most Recent Order",
    cell: ({ row }) => {
      const { latest_order_date } = row.original;
      return (
        <div>
          {formatDateToLocal(latest_order_date)}
        </div>
      );
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <Button variant={"ghost"}>
          <Trash2 size={16} />
        </Button>
      );
    },
  },
];
