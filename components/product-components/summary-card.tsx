import { fetchCustomers } from "@/lib/data/data";
import { ScrollArea } from "../ui/scroll-area";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { useProductContext } from "./product-context-provider";

interface SummaryCardProps {
  selections: string[];
}
//NOTE TODO: implement props
function SummaryCard() {
  const { summaryCard } = useProductContext();
  const { orderName, orderSpec, productQuantity } = summaryCard;
  const { glassType, glassShape, glassSize, glassThickness, glassColor } =
    orderSpec;
  return (
    <Card className="w-full text-center shadow-md ">
      <CardHeader className="bg-slate-200">
        <h1>Order name</h1>
      </CardHeader>
      <CardContent className="h-min-[100px]">
        <ScrollArea className="whitespace-nowrap p-2">
          <div className="space-y-4">
            <div className="flex justify-between">
              <p>Glass Type</p>
              <p>{glassType}</p>
            </div>
            <div className="flex justify-between">
              <p>Glass Shape</p>
              <p>{glassShape}</p>
            </div>
            <div className="flex justify-between">
              <p>Glass Size</p>
              <p>{glassSize}</p>
            </div>
            <div className="flex justify-between">
              <p>Glass Thickness</p>
              <p>{glassThickness}</p>
            </div>
            <div className="flex justify-between">
              <p>Glass Color</p>
              <p>{glassColor}</p>
            </div>
            <div className="flex justify-between">
              <p>Quantity</p>
              <p>{productQuantity}</p>
              </div>
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
