import { Button } from "@/components/ui/button";
import OrderSummary from "./order-summary";

export default function OrderSummaryPage() {
    return (
        <main className="lg:w-3/4 sm:w-full border rounded-md bg-white p-4">
            <div className="flex justify-between w-full">
                <h1 className="text-2xl font-bold">
                    Order Summary
                </h1>
                <Button>
                    Submit Order/Quote
                </Button>
            </div>
            <OrderSummary/>
            <div className="flex justify-between">
                <Button>
                    Add Item
                </Button>
                <Button>
                    Save Draft
                </Button>
            </div>
        </main>
    );
}