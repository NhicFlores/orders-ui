import { UserRound } from "lucide-react";
//import { icons } from "lucide-react";
//how does this import statement work - what is the shape of 'icons' and how do we iterate through it while enforcing type safety 

//instead of a generic icon component, we can use an icons definitions file to have all our icon imports in once place 
const icons = [
    UserRound,
];

type IconProps = {
    name: string, 
    color: string, 
    size: string
}

// function Icon ({name, color, size}: IconProps) {
//     // const LucideIcon = icons[icons.indexOf(name)];
//     const LucideIcon = icons[name];

//     return(<LucideIcon color={color} size={size}/>);
// }

export const Icon = ({ name, color, size }: IconProps) => {
    const LucideIcon = icons[0];
  
    return <LucideIcon color={color} size={size} />;
};

//this approach still requires importing the right icon at every file 
export const UserRoundIcon = () => {
    return <></>;
};