"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OrderDetailSchema } from "@/schema/form-schema";
import { OrderDetails, OrderStatus } from "@/lib/data-model/data-definitions";

interface OrderDetailFormProps {
  orderDetail?: OrderDetails;
}

const OrderForm = ({ orderDetail }: OrderDetailFormProps) => {
  const orderDetailForm = useForm<z.infer<typeof OrderDetailSchema>>({
    resolver: zodResolver(OrderDetailSchema),
    defaultValues: orderDetail
      ? orderDetail
      : {
          order: {
            order_id: "",
            created_by: "",
            customer_id: "",
            order_name: "",
            order_number: "",
            shipping_data: {
              street: "",
              apt_num: "",
              city: "",
              state: "",
              zip: "",
              is_job_site: false,
              note: "",
            },
            billing_data: {
              street: "",
              apt_num: "",
              city: "",
              state: "",
              zip: "",
              payment_method: "",
              purchase_order: "",
              primary_contact_name: "",
              primary_contact_email: "",
              primary_contact_phone: "",
              fax_num: "",
              is_primary: false,
              is_active: false,
            },
            status: OrderStatus.Draft,
            amount: 0,
            date_created: new Date(),
            date_updated: new Date(),
            date_submitted: new Date(),
            date_shipped: new Date(),
            date_delivered: new Date(),
          },
          order_invoice: { order_invoice_id: "" },
          order_items: [],
        },
  });

  return (
    <Form {...orderDetailForm}>
      <form>
        <div>order form</div>
      </form>
    </Form>
  );
};

export default OrderForm;
