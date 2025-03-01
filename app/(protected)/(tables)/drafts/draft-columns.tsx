// //client component containing column definitions
// "use client";
// import { ColumnDef, RowExpanding } from "@tanstack/react-table";
// import { ArrowUpDown, MoreHorizontal } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import Link from "next/link";
// import { deleteOrder } from "@/lib/actions/actions";
// import { formatDateStringToLocal } from "@/lib/utils";
// import { Order } from "@/lib/data-model/schema-definitions";

// //TODO NOTE: enable shift select
// //TODO NOTE: draft form: save button with empty fields
// //TODO NOTE: for conditional columns: concatenate arrays
// //NOTE: client columns depend on how we want them to use the app
// //will they want to be able to put their own customer names attached to the order so they know where glass is going
// //more than likely, they'll keep that on their own systems, so PO is the column that they'll want
// //if we pull all orders by company, they'll want an 'Entered By' date to see who made the order

// // NOTE: thought i needed to define a new type for the datatable to read the columns right
// // but the issue was strongly typing the sql query result
// // type DraftColumns = {
// //     id: string;
// //     customer_id: string;
// //     order_name: string;
// //     product_id: string;
// //     quantity: number;
// //     total: number;
// //     date: string;
// // };
// // NOTE: DEPRECATED
// export const DraftColumns: ColumnDef<Order>[] = [
//   {
//     id: "select",
//     header: ({ table }) => (
//       <Checkbox
//         checked={
//           table.getIsAllPageRowsSelected() ||
//           (table.getIsSomePageRowsSelected() && "indeterminate")
//         }
//         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//         aria-label="Select all"
//       />
//     ),
//     cell: ({ row }) => (
//       <Checkbox
//         checked={row.getIsSelected()}
//         onCheckedChange={(value) => row.toggleSelected(!!value)}
//         aria-label="select row"
//       />
//     ),
//   },
//   {
//     id: "actions",
//     cell: ({ row }) => {
//       const order = row.original;
//       //const deleteOrderWithId = deleteOrder.bind(null, order.order_id);
//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant={"ghost"} className="h-8 w-8 p-0">
//               <span className="sr-only">Open menu</span>
//               <MoreHorizontal className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuLabel>Actions</DropdownMenuLabel>
//             <DropdownMenuItem
//               onClick={() => navigator.clipboard.writeText(order.order_id)}
//             >
//               Copy order ID
//             </DropdownMenuItem>
//             <Link href={`/order/${order.order_id}/edit`}>
//               <DropdownMenuItem>Edit Order</DropdownMenuItem>
//             </Link>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>View customer</DropdownMenuItem>
//             <DropdownMenuItem>View product details</DropdownMenuItem>
//             <DropdownMenuSeparator />
//             {/** NOTE HOW TO Server Actions are not limited to <form> and can be invoked from event handlers, useEffect, third-party libraries, and other form elements like <button> **/}

//             <DropdownMenuItem
//               onClick={() => deleteOrder(order.order_id)}
//               className="focus:bg-red-500 focus:text-white"
//             >
//               Delete Order
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       );
//     },
//   },
//   {
//     accessorKey: "order_name",
//     header: ({ column }) => {
//       return (
//         <Button
//           variant={"ghost"}
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Order Name
//           <ArrowUpDown className="ml-2 h-4 w-4" />
//         </Button>
//       );
//     },
//   },
//   //TODO NOTE: product id's should all be changed to product description: we'll use order_item on backend
//   // {
//   //   accessorKey: "price",
//   //   header: ({ column }) => {
//   //     return (
//   //       <Button
//   //         variant={"ghost"}
//   //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//   //       >
//   //         <div className="text-right">Total</div>
//   //         <ArrowUpDown className="ml-2 h-4 w-4" />
//   //       </Button>
//   //     );
//   //   },
//   //   cell: ({ row }) => {
//   //     const price = parseFloat(row.getValue("price"));
//   //     const formatted = new Intl.NumberFormat("en-US", {
//   //       style: "currency",
//   //       currency: "USD",
//   //     }).format(price);
//   //     return <div className="text-right pr-5 font-medium">{formatted}</div>;
//   //   },
//   // },
//   {
//     accessorKey: "date_created",
//     header: ({ column }) => {
//       return (
//         <Button
//           variant={"ghost"}
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Date
//           <ArrowUpDown className="ml-2 h-4 w-4" />
//         </Button>
//       );
//     },
//     cell: ({ row }) => {
//       const date = row.getValue("date_created"); //NOTE TO DO: casting vs conversion
//       const formattedDate = formatDateStringToLocal(date as string);
//       return <div>{formattedDate}</div>;
//     },
//   },
// ];
