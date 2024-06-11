
import BillingForm from '@/app/ui/components/account-components/billing-form'
import BillingFormWrapper from '@/app/ui/components/account-components/billing-form-wrapper'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'

const BillingPage = () => {
    //NOTE: once the user has multiple payment methods, we will need to create a table with expandable rows to show the details of each payment method
  return (
    <main className='lg:w-1/2 sm:w-full border rounded p-4 bg-white'>
            <div className="w-full border-b-2 mb-4 flex justify-between">
        <h1 className="text-2xl font-bold">Billing Options</h1>
        <Button className="mb-1">
          <PlusIcon size={16} />
          <div className="pl-2">New Payment Option</div>
        </Button>
      </div>
      
        <BillingFormWrapper/>
    </main>
  )
}

export default BillingPage
