"use client";
import { useProductContext } from "@/components/product-components/product-context-provider";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SpecificationString } from "@/lib/definitions/product-context";

// function QuantityDropdown() {
//   const [quantity, setQuantity] = useState("1");

//   const handleChange = (event: { target: { value: string } }) => {
//     console.log(event.target.value);
//     setQuantity(event.target.value);
//     console.log(quantity);
//   };

//   return (
//     <select
//       value={quantity}
//       onChange={handleChange}
//       className="p-2 text-center w-12"
//     >
//       {[...Array(200)].map((_, i) => (
//         <option key={i} value={i + 1}>
//           {i + 1}
//         </option>
//       ))}
//     </select>
//   );
// }

function QuantitySelector() {
  const { updateOrderItemQuantity } = useProductContext();

  function handleChange(value: string) {
    updateOrderItemQuantity(Number(value));
  }
  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="">
        <SelectValue placeholder="1" />
      </SelectTrigger>
      <SelectContent position="popper" className="">
        {[...Array(200)].map((_, i) => (
          <SelectItem key={i} value={String(i + 1)}>
            {i + 1}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

interface orderSummaryProps {
  orderDescription: SpecificationString;
}

export default function OrderSummary({ orderDescription }: orderSummaryProps) {
  function descriptionFormatter() {
    return (
      <div>
        <p>{orderDescription.glassThickness}&quot;</p>
        <p>{orderDescription.glassColor}</p>
        <p>{orderDescription.glassType}</p>
      </div>
    );
  }

  function dimensionsFormatter() {
    return (
      <div>
        <p>{orderDescription.glassSize}</p>
      </div>
    );
  }

  function orderItemDisplay() {
    return (
      <section className="border rounded-md my-4">
        <div className="flex justify-between border-r">
          <div className="flex flex-col bg-slate-100 w-full">
            <h2 className="border p-4">Description</h2>
            <div className="bg-white border p-4">{descriptionFormatter()}</div>
          </div>
          <div className="flex flex-col bg-slate-100 w-full">
            <h2 className="border p-4">Dimensions</h2>
            <div className="bg-white border p-4 flex-grow">
              {dimensionsFormatter()}
            </div>
          </div>
          <div className="flex flex-col bg-slate-100 w-full">
            <h2 className="border p-4">Fabrication</h2>
            <div className="flex-grow bg-white border p-4">
              Fabrication Options
            </div>
          </div>
          <div className="flex flex-col bg-slate-100">
            <h2 className="border p-4">Quantity</h2>
            <div className="flex-grow bg-white border p-4 ">
              <QuantitySelector />
            </div>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="border rounded-md">

    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Description</TableHead>
          <TableHead>Dimensions</TableHead>
          <TableHead>Fabrication</TableHead>
          <TableHead>Quantity</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>
            {descriptionFormatter()}
          </TableCell>
          <TableCell>
            {dimensionsFormatter()}
          </TableCell>
          <TableCell>Fabrication Options</TableCell>
          <TableCell>
            <QuantitySelector />
          </TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>
            Total
          </TableCell>
          <TableCell>
            12
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
    </section>
  );
}
