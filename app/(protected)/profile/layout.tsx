import { auth } from "@/auth";


const ProfileLayout = async ({children}: {children: React.ReactNode}) => {
    // NOTE TODO: parallel rendering 
    //can use parallel rendering here to load all profile data for each page 
    //load all pages in route group based on authentication status and role 
    const session = await auth();
  return (
    <div className="w-full h-full flex flex-col items-center bg-slate-50">
      {children}
    </div>
  )
}

export default ProfileLayout;
