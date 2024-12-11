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
import { visibleStatusFilter } from "@/app/(protected)/(tables)/orders/columns";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}
// NOTE TODO: calculate performance impact of client-side operations on data 
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
    date_delivered: false, // NOTE TODO: CAN SET THIS UP DYNAMICALLY WITH USER SETTINGS
  });
  const [rowSelection, setRowSelection] = useState({});
  //const [globalFilter, setGlobalFilter] = useState<string>("");
  //const globalFilter = fuzzyOrderFilter;

  //NOTE TODO: conditionally render filter for existing columns
  //NOTE TODO: SORT ROWS BY STATUS AND DATE RANGE

  // get all available status values into a string array
  // for each status, render a dropdown element with a checkbox
  // create a filter status array
  // when checkbox is checked, add status to filter status array
  // pass filter status array to table to filter out statuses

  const statusValues = Object.values(OrderStatus);
  // let statusFilterValues =
  // if i filter out a status using a state passed to the table, the whole table will re-render
  // if i filter out the status from the rows, the table will still re-render

  const initialVisibleStatus = Object.values(OrderStatus).map((status) => {
    return {
      statusValue: status,
      isVisible: status === OrderStatus.Cancelled ? false : true,
    };
  });
  const [visibleStatus, setVisibleStatus] = useState(initialVisibleStatus);
  // NOTE TODO: set state of array of statuses to filter out
  // filter function looks at this state to determine which statuses to filter out
  function toggleStatusVisibility(
    status: {
      statusValue: string;
      isVisible: boolean;
    },
    value: boolean
  ) {
    // TODO: where to call table to pass updated status filter state
    // table
    //   .getColumn("status")
    //   ?.setFilterValue(value ? null : status.statusValue);
    // CHALLENGE: state update functions are asynchronous and the table needs to
    // update when the state is updated
    setVisibleStatus((prev) => {
      return prev.map((prevStatus) => {
        if (prevStatus.statusValue === status.statusValue) {
          return { ...prevStatus, isVisible: value };
        }
        return prevStatus;
      });
    });
  }

  // const typedData = data as OrderDetails[];
  const filteredData = data.filter((order) => {
    return visibleStatus.some((status) => {
      return status.visible && order.status === status.value;
    });
  })

  const table = useReactTable({
    data, // filtered data
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
      statusFilter: visibleStatusFilter, // (row, columnId, filterValue) => {
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
                    checked={status.isVisible}
                    onCheckedChange={(value) => {
                      // value corresponds to the internal state of the checkbox
                      // to make sure both the isVisible property of the status object and
                      // which status value is filtered out, rely on this 'value' provided
                      // by the onCheckedChange callback
                      // console.log("value", value);
                      toggleStatusVisibility(status, value);
                      table
                        .getColumn("status")
                        ?.setFilterValue(value ? null : status.statusValue);
                      // NOTE TODO: FIX FILTER; should be able to filter out multiple statues at a time
                      //table.setGlobalFilter(status.value || OrderStatus.Quote);
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
