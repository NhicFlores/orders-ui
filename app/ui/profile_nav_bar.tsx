import { Button } from "@/components/ui/button";

export function ProfileNavBar() {
    return (
        <div className="flex-grow justify-between">
            <Button>
                Profile
            </Button>
            <div>
            <Button variant={'default'}>
                Quotes 
            </Button>
            <Button>
                Orders
            </Button>
            <Button>
                Drafts
            </Button>
            </div>

        </div>
    );
}

const styles = {
    
};