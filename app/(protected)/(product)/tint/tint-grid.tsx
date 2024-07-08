"use client";
import { tintOptions } from "@/lib/data/product-placeholder-data";
import { useProductContext } from '@/components/product-components/product-context-provider';
import ProductGrid from '@/components/product-components/ProductGrid';
import { OrderSummaryRoute } from '@/routes';

export default function TintGrid () {
  // console.log("xxxxxxxxxxxxxxxxxxxxxxxx");
  // console.log("Tint Page Rendered");
  // console.log("xxxxxxxxxxxxxxxxxxxxxxxx"); 
  const { setOrderItem, setOrderItems } = useProductContext();
  // const [count , setCount] = useState(0);

  const handleSelect = (tint: string) => {
    console.log("------------- Tint Selected: handleSelect called ------------");
    // setOrderItem((prev) => ({ ...prev, tint }));
    // orderItems.push(orderItem); // this is bad practice because it mutates the state
    //setOrderItems((prev) => [...prev, orderItem]);

    setOrderItem((prev) => {
      const updatedOrderItem = { ...prev, tint: tint };
      // Update orderItems with the updatedOrderItem
      setOrderItems((prevItems) => [...prevItems, updatedOrderItem]);
      return updatedOrderItem;
    });

  };

  return (
    <div>
      <ProductGrid productList={tintOptions} onSelect={handleSelect} nextConfigRoute={OrderSummaryRoute.href}/>
    </div>
  )
}