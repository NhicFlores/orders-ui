//profile route
'use client'
import { useCurrentUser } from "@/hooks/useCurrentUser";
import Container from "../../ui/components/page-container";
import ProfileForm from "../../ui/components/profile-components/profile-form";

export default function Page() {
    const user = useCurrentUser();

    return (
        <main className="mt-5">
            <Container>
                <div className="w-[350px] border rounded-md p-4 text-center">
                    <div>
                        current user:
                    </div>
                    <div>
                        {user?.name}
                    </div>
                </div>
                <ProfileForm/>
            </Container>
        </main>
    )
}