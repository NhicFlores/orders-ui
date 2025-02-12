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

import { fuzzyOrderFilter, statusColumnFilter } from "./table/table-utils";
import OrderDetailTable from "@/app/(protected)/(tables)/order-detail-table";
import { OrderDetailColumns } from "@/app/(protected)/(tables)/order-detail-columns";
import {
  OrderStatusArray,
  OrderStatusOptions,
} from "@/lib/data-model/enum-types";
import { useEffect, useState } from "react";
import { StatusDetails } from "@/lib/data-model/utility-types";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}
// TODO NOTE: calculate performance impact of client-side operations on data
export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
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
    date_delivered: false, // TODO NOTE: CAN SET THIS UP DYNAMICALLY WITH USER SETTINGS
  });
  const [rowSelection, setRowSelection] = useState({});
  //const [globalFilter, setGlobalFilter] = useState<string>("");
  //const globalFilter = fuzzyOrderFilter;

  //TODO NOTE: conditionally render filter for existing columns
  //TODO NOTE: SORT ROWS BY STATUS AND DATE RANGE

  const initialVisibleStatus = OrderStatusArray.map((status) => {
    // NOTE: here we can implement user settings to determine which statuses are visible
    return {
      statusValue: status,
      isVisible: status === OrderStatusOptions.Cancelled ? false : true,
    };
  });
  // state variable for status visibility
  const [visibleStatus, setVisibleStatus] =
    useState<StatusDetails[]>(initialVisibleStatus);

  // function to toggle status visibility
  function toggleStatusVisibility(
    status: {
      statusValue: string;
      isVisible: boolean;
    },
    value: boolean
  ) {
    setVisibleStatus((prev) => {
      return prev.map((prevStatus) => {
        if (prevStatus.statusValue === status.statusValue) {
          return { ...prevStatus, isVisible: value };
        }
        return prevStatus;
      });
    });
  }
  // block-scoped variable table used before its initialization
  // useEffect(() => {
  //   table.getColumn("status")?.setFilterValue(visibleStatus);
  // }, [table, visibleStatus]);

  // this cause website to hang, might be caught in asynchronous state update loop
  // const typedData = data as OrderDetails[];
  // const filteredData = typedData.filter((order) => {
  //   console.log("---- FILTERING ----");
  //   return visibleStatus.some((status) => {
  //     return status.isVisible && order.status === status.statusValue;
  //   });
  // })

  const table = useReactTable({
    data: data,
    columns: columns,
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
      // TODO NOTE: experiment with removing fuzzy filter for global filter
      fuzzy: fuzzyOrderFilter,
      // status filter
      statusFilter: statusColumnFilter, // (row, columnId, filterValue) => {
      //   return filterValue ? row.original.status !== filterValue : false;
      // },
    },
    globalFilterFn: fuzzyOrderFilter,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      //globalFilter,
    },
    // initialState: {
    //   columnVisibility: {}
    // }
  });
  // NOTE: CONTINUE IMPLEMENTATION
  // https://github.com/TanStack/table/discussions/4133
  // https://tanstack.com/table/latest/docs/guide/column-filtering

  // useEffect to watch for changes in visibleStatus state to trigger filter update on status column
  useEffect(() => {
    // pass the visibleStatus state to the status column filter function
    table.getColumn("status")?.setFilterValue(visibleStatus);
  }, [table, visibleStatus]);

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
                // dropdown menu for status filter
                return (
                  <DropdownMenuCheckboxItem
                    key={index}
                    checked={status.isVisible}
                    onCheckedChange={(value) => {
                      // value corresponds to the internal state of the checkbox
                      // to make sure both the isVisible property of the status object and
                      // which status value is filtered out, rely on this 'value' provided
                      // by the onCheckedChange callback
                      // console.log("value", value);
                      // state updates happen asynchronously, but do not return a promise so
                      // you cannot use async/await syntax
                      toggleStatusVisibility(status, value);
                    }}
                  >
                    {status.statusValue}
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
                      {/* create toString function for column names  */}
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
