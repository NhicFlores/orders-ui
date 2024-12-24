"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OrderDetailSchema } from "@/schema/form-schema";
import { OrderDetails } from "@/lib/data-model/data-definitions";

interface OrderDetailFormProps {
    orderDetail?: OrderDetails;
    
}

const OrderForm = ({orderDetail}: OrderDetailFormProps) => {
    const orderDetailForm = useForm<z.infer<typeof OrderDetailSchema>>({
        resolver: zodResolver(OrderDetailSchema),
    })
  return (
    <Form {...orderDetailForm}>
      <form>
        <div>
            order form
        </div>
      </form>
    </Form>
  );
};

export default OrderForm;
