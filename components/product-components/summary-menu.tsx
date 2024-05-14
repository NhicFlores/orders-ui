import { fetchCustomers } from "@/app/lib/data"
import { ScrollArea } from "../ui/scroll-area"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";


interface SummaryMenuProps {
    order_name: string;
    scrollable_list: string[];
    total: number;
}

async function SummaryMenu(){
    const customers = await fetchCustomers();

  return (
    <Card className="w-full text-center shadow-md">
        <CardHeader className="bg-gray-200">
            <h1>
                Order name
            </h1>
        </CardHeader>
        <CardContent className="">
            <ScrollArea className="whitespace-nowrap p-2">
                <div className="space-y-4">
                    {customers.map(( customer ) => (
                        <div key={customer.id} className="text-sm border-b bg-green-100">
                            {customer.name}
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </CardContent>
        <CardFooter className="bg-gray-200 justify-left items-center"> 
            <p>
                order total
            </p>
        </CardFooter>
    </Card>
  )
}

export default SummaryMenu
