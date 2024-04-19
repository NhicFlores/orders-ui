import { createOrder } from "@/app/lib/actions";

export default function DesignForm(){
    return(
        <form action={createOrder}>
            <div>
                <p>start form</p>
            </div>
        </form>
    )
}