//import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { lusitana } from '@/app/ui/fonts';
import { Order } from '@/app/lib/definitions';

export default function Orders_List() {
  //const latestInvoices = await fetchLatestInvoices();

  const orders: Order[] = [
    {
        id: 'temp',
        customer_id: 'customers[0].id',
        order_name: 'living room windows',
        product_id: '1234',
        quantity: 5,
        price: 100.00,
        date: '04-16-2024',
        status: 'pending',
    },
    {
        id: 'temp',
        customer_id: 'customers[1].id',
        order_name: 'barn door',
        product_id: '1234',
        quantity: 1,
        price: 100.00,
        date: '04-16-2024',
        status: 'draft',
    },
    {
        id: 'temp',
        customer_id: 'customers[2].id',
        order_name: 'shower doors',
        product_id: '1234',
        quantity: 5,
        price: 100.00,
        date: '04-16-2024',
        status: 'shipped',
    },
];

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Orders
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        {/* NOTE: comment in this code when you get to this point in the course */}
        <div className="bg-white px-6">
          {orders.map((order, i) => {
            return (
              <div
                key={order.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {order.order_name}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {order.date}
                    </p>
                  </div>
                </div>
                <p
                  className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
                >
                  {order.quantity}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
