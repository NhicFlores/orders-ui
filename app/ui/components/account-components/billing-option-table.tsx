'use client'
import React, { useState } from "react"
import BillingForm from "./billing-form"
import { BillingInfo } from "@/lib/definitions/profile-definitions"
import { ColumnDef } from "@tanstack/react-table"

interface BillingOptionTableProps {
    billingData: BillingInfo[]
    columns: ColumnDef<BillingInfo>[]
}

const BillingOptionTable = ({ billingData, columns}: BillingOptionTableProps) => {
    const [billingOptions, setBillingOptions] = useState<BillingInfo[]>([])
    const [expandedRow, setExpandedRow] = useState(null)

    //const table = useReactTable({})

  return (
    <table>
        <thead>
            <tr>
                <th>Payment Method</th>
                <th>Purchase Order</th>
                <th>Date Used</th>
            </tr>
        </thead>
        <tbody>
            {billingOptions.map((billingOption, index) => (
                <React.Fragment key={index}>
                    <tr>
                        <td>{billingOption.payment_method}</td>
                    </tr>
                </React.Fragment>
            ))}
        </tbody>
    </table>
  )
}

export default BillingOptionTable
