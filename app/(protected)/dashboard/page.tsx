import DashboardNavStack from "@/app/ui/components/dashboard-nav-stack"
import { auth } from "@/auth"

//NOTE TODO: remove auth statement 
const DashboardPage = async () => {
  //"grid text-center sm:mt-10 lg:mb-0 lg:mt-30 lg:w-auto lg:max-w-10xl lg:grid-rows-3 lg:text-center"
  const session = await auth();
  console.log(JSON.stringify(session));
  return (
    <div className="flex flex-col justify-center items-center sm:mt-10 lg:mb-0 lg:mt-30 lg:w-auto lg:grid-rows-3 lg:text-center">
      <DashboardNavStack/>
    </div>
  )
}

export default DashboardPage