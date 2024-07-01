"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import ShippingForm from "../../(account)/shipping/shipping-form";

export default function ShippingSection() {
    const [showShippingForm, setShowShippingForm] = useState(false)
    return (
        <div className="border rounded p-4 space-y-4">
        <div className="text-lg font-bold">Enter Shipping Address</div>
        <div className="flex items-center gap-2">
          <Checkbox />
          <div>Same as billing address</div>
        </div>
        <div className="flex space-x-2">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select Shipping Address" />
            </SelectTrigger>
            <SelectContent>
              <div>
                <SelectItem value="Credit Card">Address 1</SelectItem>
              </div>
              <div>
                <SelectItem value="Paypal">Address 2</SelectItem>
              </div>
            </SelectContent>
          </Select>
          <Button onClick={() => setShowShippingForm(!showShippingForm)}>Add Shipping Address</Button>
        </div>
        {showShippingForm && (
            <ShippingForm/>
        )}
      </div>
    )
}