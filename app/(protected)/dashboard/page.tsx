import DashboardNavStack from "@/app/ui/components/dashboard-nav-stack"

const DashboardPage = () => {
  //"grid text-center sm:mt-10 lg:mb-0 lg:mt-30 lg:w-auto lg:max-w-10xl lg:grid-rows-3 lg:text-center"
  return (
    <div className="flex flex-col items-center sm:mt-10 lg:mb-0 lg:mt-30 lg:w-auto lg:grid-rows-3 lg:text-center">
      <DashboardNavStack/>
    </div>
  )
}

export default DashboardPage