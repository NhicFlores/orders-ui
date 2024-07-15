import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  SortingState,
  getSortedRowModel,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
} from "@tanstack/react-table";

interface OrderDetailTableProps {
  
}

export default function OrderDetailTable() {
//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//   });

  return (
    <div>
      <Table>
        <TableHeader>
            <TableHead>Order Items</TableHead>
            <TableHead>Billing Information</TableHead>
            <TableHead>Shipping</TableHead>
        </TableHeader>
        <TableBody>

        </TableBody>
      </Table>
    </div>
  );
}
