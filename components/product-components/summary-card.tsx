import { fetchCustomers } from "@/app/lib/data";
import { ScrollArea } from "../ui/scroll-area";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";

interface SummaryCardProps {
  selections: string[];
}
//NOTE TODO: implement props
function SummaryCard({selections}: SummaryCardProps) {
  
  return (
    <Card className="w-full text-center shadow-md ">
      <CardHeader className="bg-slate-200">
        <h1>Order name</h1>
      </CardHeader>
      <CardContent className="h-[100px]">
        <ScrollArea className="whitespace-nowrap p-2">
          <div className="space-y-4">
            {selections?.map((option, index) => (
              <div key={index} className="text-sm border-b bg-green-100">
                {option}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="bg-slate-200 pt-4">
        <div className="w-full space-y-4">
          <div className="flex justify-between">
          <p>Order Total</p>
            <p>$0.00</p>
          </div>
          <div className="flex justify-between">
            <Button>Save</Button>
            <Button className="">Submit Order</Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default SummaryCard;
