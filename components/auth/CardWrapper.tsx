import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import AuthHeader from "./AuthHeader";
import AuthLink from "./AuthLink";

interface CardWrapperProps {
  header: string;
  label: string;
  backButtonHref: string;
  backButtonLabel: string;
  children: React.ReactNode;
}
// TODO NOTE: create auth header component for conditional styling
//create back button
//consider renaming to Form Wrapper since this card wraps the forms
//rule of thumb for breaking down components
//blocks containing info such as props, with their own containerized styling,
// can be extracted into their own component : ex. AuthHeader
const CardWrapper = ({
  header,
  label,
  backButtonHref,
  backButtonLabel,
  children,
}: CardWrapperProps) => {
  return (
    <Card className="p-5 xl:w-1/4 md:w-1/2 shadow-md">
      <CardHeader>
        <AuthHeader header={header} label={label} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <AuthLink label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
