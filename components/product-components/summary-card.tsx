import { ScrollArea } from "../ui/scroll-area";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { useProductContext } from "./product-context-provider";


function SummaryCard() {
  const { order, orderItem } = useProductContext();

  const { type, shape, dimensions, thickness, tint, quantity } = orderItem;
  return (
    <Card className="w-full text-center shadow-md ">
      <CardHeader className="bg-slate-200">
        <h1>{order.order_name}</h1>
      </CardHeader>
      <CardContent className="h-min-[100px]">
        <ScrollArea className="whitespace-nowrap p-2">
          <div className="space-y-4">
            <div className="flex justify-between">
              <p>Glass Type</p>
              <p>{type}</p>
            </div>
            <div className="flex justify-between">
              <p>Glass Shape</p>
              <p>{shape}</p>
            </div>
            <div className="flex justify-between">
              <p>Glass Size</p>
              <p>{dimensions}</p>
            </div>
            <div className="flex justify-between">
              <p>Glass Thickness</p>
              <p>{thickness}</p>
            </div>
            <div className="flex justify-between">
              <p>Glass Color</p>
              <p>{tint}</p>
            </div>
            <div className="flex justify-between">
              <p>Quantity</p>
              <p>{quantity}</p>
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
