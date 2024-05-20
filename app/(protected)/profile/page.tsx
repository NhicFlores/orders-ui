//profile route
import Container from "../../ui/components/page-container";
import ProfileForm from "../../ui/components/profile-components/profile-form";
import { auth } from "@/auth";

export default async function ProfilePage() {
    const session = await auth();
  return (
        <main className="lg:w-1/2 sm:w-full bg-white border rounded-md p-6">
            <Container>
                <ProfileForm />
            </Container>
        </main>
  );
};

