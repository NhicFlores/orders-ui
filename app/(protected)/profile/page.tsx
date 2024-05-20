//profile route
'use client'
import { useCurrentUser } from "@/hooks/useCurrentUser";
import Container from "../../ui/components/page-container";
import ProfileForm from "../../ui/components/profile-components/profile-form";

export default function Page() {
    const user = useCurrentUser();
    // console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\nXXXXXXXXXXXXXX USER IN PROFILE PAGE XXXXXXXXXXXX\nXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    // console.log(user);
    return (
        <main>
            <Container>
                <div className="w-[350px] border rounded-md p-4 text-center">
                    <div>
                        current user:
                    </div>
                    <div>
                        {JSON.stringify(user)}
                    </div>
                </div>
                <ProfileForm/>
            </Container>
        </main>
    )
}