import ProductHeader from "@/components/product-components/product-header";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CheckoutPage() {
  return (
    <main className="lg:w-3/4 sm:w-full border rounded-md bg-white p-4 space-y-6">
      <ProductHeader
        title="Checkout"
        backRoute="/order-summary"
        continueRoute=""
      />
      <div className="space-y-4">
        <div className="border rounded-md p-4">
          <div className="text-lg font-bold py-2">
            Choose Payment Method or Add a New One
          </div>
          <div className="flex space-x-2">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Payment Method" />
              </SelectTrigger>
              <SelectContent>
                <div>
                  <SelectItem value="Credit Card">Credit Card</SelectItem>
                </div>
                <div>
                  <SelectItem value="Paypal">Paypal</SelectItem>
                </div>
              </SelectContent>
            </Select>
            <Button>Add Payment Method</Button>
          </div>
        </div>
        <div className="border rounded p-4 space-y-4">
          <div className="text-lg font-bold">Enter Shipping Address</div>
          <div className="flex space-x-2">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Payment Method" />
              </SelectTrigger>
              <SelectContent>
                <div>
                  <SelectItem value="Credit Card">Credit Card</SelectItem>
                </div>
                <div>
                  <SelectItem value="Paypal">Paypal</SelectItem>
                </div>
              </SelectContent>
            </Select>
            <Button>Add Payment Method</Button>
          </div>
        </div>
      </div>
    </main>
  );
}
