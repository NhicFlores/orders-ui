//profile route
import Container from "../../ui/components/page-container";
import ProfileForm from "../../ui/components/profile-components/profile-form";
import { auth } from "@/auth";

export default async function ProfilePage() {
    const session = await auth();
  return (
        <main>
        <div className="w-[650px] border rounded-md p-4 text-center">
            <div>current user:</div>
            <div>{JSON.stringify(session?.user) || 'null'}</div>
          </div>
        <Container>
            <ProfileForm />
        </Container>
        </main>
    
  );
};

