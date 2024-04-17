//client component containing column definitions
"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Order = {
  id: string;
  customer_id: string;
  order_name: string;
  product_id: string;
  amount: number;
  price: number;
  date: string;
  status: "pending" | "draft" | "shipped" | "processing";
};

export const order_table_columns: ColumnDef<Order>[] = [
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
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "price",
    header: "Total",
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
