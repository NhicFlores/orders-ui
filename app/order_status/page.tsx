//order status page 

import Orders_List from "../ui/components/orders_list";

export default function Page(){
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                <Orders_List/>
            </div>
        </main>
    );
}