"use client";
import { ScrollArea } from "../ui/scroll-area";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { useProductContext } from "./product-context-provider";

function SummaryCard() {
  const { order, orderItem } = useProductContext();

  const {
    glassType: type,
    shape,
    dimensions,
    thickness,
    tint,
    quantity,
  } = orderItem;

  return (
    <Card className="w-full rounded-md text-center shadow-md max-w-[350px]">
      <CardHeader className="bg-slate-200 rounded-md rounded-b-none">
        <h1>{order.order_name}</h1>
        <h1>Current Item</h1>
      </CardHeader>
      <CardContent className="min-h-[100px]">
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
      <CardFooter className="bg-slate-200 pt-4 rounded-md rounded-t-none">
        <div className="w-full space-y-4">
          <div className="flex justify-between">
            <p>Order Total</p>
            <p>$0.00</p>
          </div>
          <div className="flex justify-between">
            <Button>Save</Button>
            <Button className="">Submit Order</Button>
          </div>
          <div className="border rounded-md p-4">
            <p>billing info id</p>
            <p className="break-all">
              {JSON.stringify(order.billing_info_id)}
            </p>
          </div>
          <div className="border rounded-md p-4">
            <p>shipping info</p>
            <p>
              {order.shipping_info.delivery_addr?.street}
            </p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default SummaryCard;
