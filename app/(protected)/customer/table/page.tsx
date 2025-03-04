"use server";
import LinkButton from "@/components/nav/link-button";
import { CustomerColumns } from "@/components/table-columns/customer-columns";
import { DataTableWithFilter } from "@/components/tables/filter-table";
import { CustomerTableRow } from "@/lib/data-model/query-types";
import {
  getCustomers,
  getCustomerTableData,
  getInvoiceSummaryPerCustomer,
  getNumberOfOrders,
  getOrderByFilter,
  getOrdersByCustomerId,
} from "@/lib/data/customer-data";
import { NewCustomerRoute } from "@/routes";
import Link from "next/link";
import React from "react";

const CustomerTablePage = async () => {
  // const customers = await getCustomers();
  // console.log(customers);
  const customerData = await getCustomerTableData();
  // console.log("CUSTOMER DATA COUNT", customerData);

  // const filteredOrders = await getOrderByFilter();
  // console.log("FILTERED ORDERS COUNT", filteredOrders.length);
  // getNumberOfOrders();
  // getInvoiceSummaryPerCustomer();
  // getOrdersByCustomerId("3591f66c-3fb3-43ad-932f-b03884cafd09")
  return (
    <div className="data-table-container">
      <LinkButton
        href={NewCustomerRoute.href}
        label={NewCustomerRoute.label}
      />
      <DataTableWithFilter columns={CustomerColumns} data={customerData} />
    </div>
  );
};

export default CustomerTablePage;
