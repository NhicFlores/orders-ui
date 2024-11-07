import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  OrderItem,
  UserBillingInformation,
  UserShippingInformation,
} from "@/lib/data-model/schema-definitions";

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
  orderItems: OrderItem[];
  billingInfo: UserBillingInformation;
  shippingInfo: UserShippingInformation;
}

export default function OrderDetailTable({
  orderItems,
  billingInfo,
  shippingInfo,
}: OrderDetailTableProps) {
  //   const table = useReactTable({
  //     data,
  //     columns,
  //     getCoreRowModel: getCoreRowModel(),
  //   });

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order Items</TableHead>
            <TableHead>Billing Information</TableHead>
            <TableHead>Shipping</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              {orderItems.map((orderItem, index) => (
                <div key={index}>
                  <div>{JSON.stringify(orderItem.product_config)}</div>
                  <div>{orderItem.quantity}</div>
                  <div>{orderItem.note}</div>
                </div>
              ))}
            </TableCell>
            <TableCell>
              <div>{billingInfo.purchase_order}</div>
              <div>{billingInfo.payment_method}</div>
              <div>{JSON.stringify(billingInfo.street)}</div>
            </TableCell>
            <TableCell>
              {shippingInfo.is_job_site && (
                <div>{shippingInfo.is_job_site ? "Job Site" : "Home"}</div>
              )}
              <div>{shippingInfo.note}</div>
              <div>{JSON.stringify(shippingInfo.street)}</div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
