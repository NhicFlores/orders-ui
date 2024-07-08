import ProductHeader from '@/components/product-components/product-header';
import { GlassThicknessRoute, OrderSummaryRoute } from '@/routes';
import TintGrid from './tint-grid';


const TintPage = () => {
  // console.log("xxxxxxxxxxxxxxxxxxxxxxxx");
  // console.log("Tint Page Rendered");
  // console.log("xxxxxxxxxxxxxxxxxxxxxxxx"); 
  // const [count , setCount] = useState(0);

  // const handleSelect = (tint: string) => {
  //   console.log("------------- Tint Selected: handleSelect called ------------");
  //   // setOrderItem((prev) => ({ ...prev, tint }));
  //   // orderItems.push(orderItem); // this is bad practice because it mutates the state
  //   //setOrderItems((prev) => [...prev, orderItem]);

  //    // Check if the orderItem already exists in the array to avoid duplicates
  //   // if (!orderItems.some(item => item === orderItem)) {
  //   //   setOrderItems(prev => [...prev, updatedOrderItem]);
  //   // }
  //   // setCount((prevCount) => prevCount + 1);
  // };

  // console.log("xxxxxxxxxxxxxxxxxxxxxxxx");
  // console.log("COUNT: ", count);
  // console.log("xxxxxxxxxxxxxxxxxxxxxxxx");

  return (
    <div className='container p-4 space-y-4'>
      <ProductHeader title="Select Tint" backRoute={GlassThicknessRoute.href} continueRoute={OrderSummaryRoute.href}/>
      <TintGrid/>
    </div>
  )
}

export default TintPage


// const handleSelect = (tint: string) => {
//   console.log("------------- Tint Selected: handleSelect called ------------");
//   setOrderItems((prevItems) => {
//     // Assuming you want to update the last item or add a new one if it doesn't exist
//     let updated = false;
//     const updatedItems = prevItems.map((item) => {
//       if (/* condition to identify the item to update, e.g., item.id === someId */) {
//         updated = true;
//         return { ...item, tint: tint };
//       }
//       return item;
//     });

//     if (!updated) {
//       // If no item was updated, add a new one
//       updatedItems.push({ /* new item properties, including tint: tint */ });
//     }

//     return updatedItems;
//   });
//   setCount((prevCount) => prevCount + 1);
// };