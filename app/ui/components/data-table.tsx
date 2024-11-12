//client component containing <DataTable /> component

"use client";

import {
  ColumnDef,
  SortingState,
  VisibilityState,
  getSortedRowModel,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { fuzzyOrderFilter } from "./table/table-utils";
import OrderDetailTable from "@/app/(protected)/(tables)/order-detail-table";
import { OrderDetailColumns } from "@/app/(protected)/(tables)/order-detail-columns";
import { OrderStatus } from "@/lib/data-model/schema-definitions";
import { useState } from "react";
import { OrderDetails } from "@/lib/data-model/data-definitions";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>({
      select: true,
      actions: true,
      order_name: true,
      ordered_by: true,
      status: true,
      amount: true,
      date_submitted: true,
      date_created: false,
      date_updated: false,
      date_shipped: false,
      date_delivered: false, // NOTE TODO: CAN SET THIS UP DYNAMICALLY WITH USER SETTINGS
    });
  const [rowSelection, setRowSelection] = useState({});
  //const [globalFilter, setGlobalFilter] = useState<string>("");
  //const globalFilter = fuzzyOrderFilter;

    //NOTE TODO: conditionally render filter for existing columns
  //NOTE TODO: FILTER ROWS BY STATUS AND DATE RANGE
  const initialVisibleStatus = Object.values(OrderStatus).map((status) => {
    return { value: status, visible: true };
  })
  const [visibleStatus, setVisibleStatus] = useState(initialVisibleStatus);

  // const typedData = data as OrderDetails[]; 
  const filteredData = data.filter((order) => {
    return visibleStatus.some((status) => {
      return status.visible && order.status === status.value;
    });
  }) 

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    //useGlobalFilter: true,
    //onGlobalFilterChange: setGlobalFilter,
    filterFns: {
      // fuzzy: (row, columnId, value, addMeta) => {
      //   const itemRank = rankItem(row.getValue(columnId), value);

      //   addMeta({ itemRank });

      //   return itemRank.passed;
      // },
      fuzzy: fuzzyOrderFilter,
    },
    globalFilterFn: fuzzyOrderFilter,
    state: {
      sorting,
      columnFilters,
      columnVisibility, // NOTE TODO: SET DEFAULT VISIBILITY FOR SPECIFIC COLUMNS
      rowSelection,
      //globalFilter,
    },
    // initialState: {
    //   columnVisibility: {}
    // }
  });

  return (
    <div>
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Search..."
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"outline"}>Status</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {visibleStatus.map((status, index) => {
                return (
                  <DropdownMenuCheckboxItem 
                    key={index}
                    checked={status.visible}
                    onCheckedChange={(value) => {
                      setVisibleStatus((prev) => {
                        return prev.map((prevStatus) => {
                          if (prevStatus.value === status.value) {
                            return { ...prevStatus, visible: !!value };
                          }
                          return prevStatus;
                        });
                      });
                      //table.setGlobalFilter(status.value || OrderStatus.Quote);
                    }}
                  >
                    {status.value}
                  </DropdownMenuCheckboxItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"outline"} className="ml-5">
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-center">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <Collapsible key={row.id} asChild>
                  <>
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <CollapsibleTrigger key={cell.id} asChild>
                          <TableCell key={cell.id} className="text-center">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        </CollapsibleTrigger>
                      ))}
                    </TableRow>
                    <CollapsibleContent asChild>
                      <tr className="p-4 bg-slate-100">
                        <td colSpan={row.getVisibleCells().length}>
                          <OrderDetailTable
                            orderItems={row.original.order_items}
                            billingInfo={row.original.billing_data}
                            shippingInfo={row.original.shipping_data}
                          />
                        </td>
                      </tr>
                    </CollapsibleContent>
                  </>
                </Collapsible>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
