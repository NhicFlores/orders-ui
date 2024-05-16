import { fetchCustomers } from "@/app/lib/data"
import { ScrollArea } from "../ui/scroll-area"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";


interface SummaryCardProps {
    order_name: string;
    scrollable_list: string[];
    total: number;
}
//NOTE TODO: implement props 
async function SummaryCard(){
    const customers = await fetchCustomers();
    console.log(customers);
  return (
    <Card className="w-full text-center shadow-md ">
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
        <CardFooter className="bg-gray-200 justify-left items-center pt-4"> 
            <p>
                order total
            </p>
        </CardFooter>
    </Card>
  )
}

export default SummaryCard
