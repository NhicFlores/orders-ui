"use client";
import { Button } from "@/components/ui/button";
import { ItemTableRow } from "@/lib/data-model/query-types";
import { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";

export const columns: ColumnDef<ItemTableRow>[] = [
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "product_config",
    header: "Product Config",
    cell: ({ row }) => {
      const { name, thickness, shape, tint } = row.original.product_config;
      return (
        <div>
          {name ? <div>{name}</div> : null}
          {thickness ? <div>Thickness: {thickness}</div> : null}
          {shape ? <div>Shape: {shape}</div> : null}
          {tint ? <div>Tint: {tint}</div> : null}
        </div>
      );
    },
  },
  {
    header: "Dimensions",
    cell: ({ row }) => {
      const { width, height, length } = row.original.product_config;
      return (
        <div>
          {width ? <div>W: {width}</div> : null}
          {height ? <div>H: {height}</div> : null}
          {length ? <div>L: {length}</div> : null}
        </div>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "note",
    header: "Note",
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
