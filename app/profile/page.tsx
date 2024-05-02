//profile route

import Container from "../ui/components/page-container";
import ProfileForm from "../ui/components/profile-components/profile-form";

export default function Page() {
    return (
        <main className="mt-5">
            <Container>
                <ProfileForm/>
            </Container>
        </main>
    )
}