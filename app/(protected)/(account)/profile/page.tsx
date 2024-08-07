//profile route
import UserForm from "@/app/ui/components/account-components/user-form";
import Container from "../../../ui/components/page-container";
import ProfileForm from "../../../ui/components/account-components/profile-form";
import { auth } from "@/auth";
import { getUserByID, getUserProfileById } from "@/lib/data/user-data";

export default async function ProfilePage() {
  const session = await auth();
  const user = await getUserByID(session?.user.id as string);
  const profile = await getUserProfileById(session?.user.id as string);
  return (
    <main className="lg:w-1/2 sm:w-full bg-white border rounded-md p-6">
      <Container>
        <UserForm user={user} />
        <ProfileForm user_id={user.id} profile={profile} />
      </Container>
    </main>
  );

  //   return (
  //     <main className="lg:w-1/2 sm:w-full bg-white border rounded-md p-6">
  //         <Container>
  //             <UserForm user={session?.user as User}/>
  //         </Container>
  //     </main>
  // );
}
