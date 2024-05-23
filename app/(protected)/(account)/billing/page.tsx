
import BillingFormWrapper from '@/app/ui/components/account-components/billing-form-wrapper'

const BillingPage = () => {
    //NOTE: once the user has multiple payment methods, we will need to create a table with expandable rows to show the details of each payment method
  return (
    <main className='lg:w-1/2 sm:w-full border rounded p-4 bg-white'>
        <BillingFormWrapper/>
    </main>
  )
}

export default BillingPage
