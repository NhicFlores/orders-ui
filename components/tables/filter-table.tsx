//client component containing <DataTable /> component
"use client";

import {
  ColumnDef,
  SortingState,
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

import { useState } from "react";
import { fuzzyOrderFilter } from "@/lib/table-utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}
// TODO NOTE: calculate performance impact of client-side operations on data
export function DataTableWithFilter<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  //const [globalFilter, setGlobalFilter] = useState<string>("");
  //const globalFilter = fuzzyOrderFilter;

  //TODO NOTE: conditionally render filter for existing columns

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
    },
    globalFilterFn: fuzzyOrderFilter,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });
  // NOTE: CONTINUE IMPLEMENTATION
  // https://github.com/TanStack/table/discussions/4133
  // https://tanstack.com/table/latest/docs/guide/column-filtering

  return (
    <div className="data-table-container">
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
                <>
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="text-center">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                </>
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
