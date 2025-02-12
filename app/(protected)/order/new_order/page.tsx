// NOTE: DEPRECATED
import NewOrderForm from "@/app/ui/components/order-components/new_order_form";
import Container from "@/app/ui/components/page-container";
import { CustomerField } from "@/lib/definitions/definitions";

export default async function Page() {
  //const customers = await fetchCustomers();
  const customers: CustomerField[] = [
    { id: "1", name: "new order page: Test Customer" },
  ];

  return (
    <main>
      <Container>
        <NewOrderForm customers={customers} />
      </Container>
    </main>
  );
}
