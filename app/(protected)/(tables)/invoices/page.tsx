"use server";
import React from 'react'
import { fetchInvoiceTableData } from '../queries'
import { InvoiceDataTable } from './invoice-table'
import { InvoiceColumns } from './columns'

const invoicePage = async () => {
    const data = await fetchInvoiceTableData()
  return (
    <main className='container flex flex-col items-center'>
      <div className='container mx-auto py-10'>
        <InvoiceDataTable columns={InvoiceColumns} data={data} />
      </div>
    </main>
  )
}

export default invoicePage
