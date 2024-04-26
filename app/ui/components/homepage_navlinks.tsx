//homepage navlinks 
import Link from "next/link";
import clsx from "clsx";
import { HomeNavLinks } from "@/app/lib/routes";

//eventaully put into db or dedicated folder 
//export homepage, design, order links etc 
// const links = [
//     {
//         name: 'New Design',
//         href: '/design_dashboard'
//     },
//     {
//         name: 'Check Order Status',
//         href: '/order_status'
//     },
//     {
//         name: 'Browse Templates',
//         href: '/browse_templates'
//     },
// ];

export default function Homepage_NavLinks(){
    return (
        <>
            {
                HomeNavLinks.map((link) => {
                    return (
                        <Link 
                            key={link.label} 
                            href={link.href}
                            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                            >
                                <h2 className="mb-3 text-2xl font-semibold">
                                    {link.label}{" "}
                                    <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                                        -&gt;
                                    </span>
                                </h2>
                        </Link>
                    )
                })
            }
        </>
    );
}