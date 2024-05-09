import DashboardNavStack from "@/app/ui/components/dashboard-nav-stack"

const DashboardPage = () => {
  return (
    <div className="mt-30 grid text-center sm:mt-10 lg:mb-0 lg:mt-30 lg:w-auto lg:max-w-10xl lg:grid-rows-3 lg:text-center">
      <DashboardNavStack/>
    </div>
  )
}

export default DashboardPage

//classname on main div when we had the / route be the landing page 
//className="mt-30 grid text-center sm:mt-10 lg:mb-0 lg:mt-30 lg:w-auto lg:max-w-10xl lg:grid-rows-3 lg:text-center"