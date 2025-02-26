"use server";
import React from "react";
import NewInvoiceForm from "./new-invoice-form";
// NOTE TODO: create context to hold order id, invoice id, and customer id

// IMPLEMENTATION NOTE: views that come from data table objects will not be 
// server components; instead we'll use React Context to pass the data 
// TODO: refactor folder structure to allow Context to wrap table and form components 
const InvoicePage = async ({ params }: {params: {orderId: string}}) => {
    // fetch order data for new invoice form 
    // order number, amount, customer name, 
    // invoice fields: invoice number, date, due date, status 
    // order fields: number, date, billing info, ordered by, 
    // create a new invoice with invoice number, date, due date, status,
  return (
    <main className="container my-4 space-y-4">
      <NewInvoiceForm />
    </main>
  );
};

export default InvoicePage;
