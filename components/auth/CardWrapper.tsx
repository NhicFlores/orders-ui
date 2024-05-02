import { Button } from "../ui/button"
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
 } from "../ui/card"

interface CardWrapperProps {
  header: string,
  label: string,
  backButtonHref: string,
  backButtonLabel: string,
  children: React.ReactNode,
}
//NOTE TODO NEXT: create auth header component for conditional styling 
//create back button 
const CardWrapper = ({
  header,
  label,
  backButtonHref,
  backButtonLabel,
  children,
}: CardWrapperProps) => {
  return (
    <Card>
      <CardHeader>
        Login
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      <CardFooter>
        <Button>
          Login
        </Button>
      </CardFooter>
    </Card>
  )
}

export default CardWrapper
