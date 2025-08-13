import { cn } from "@/lib/utils";
import Link from "next/link";

export default function NavLink({
    href,
    children ,
    className,
} : {
    href:string;
    children:React.ReactNode;
    className?:string    
})

{
   return <Link href={href} className={cn("transition-colors text-sm duration-200 text-gray-600 hover:text-rose-500" , className)}>
    {children}</Link>
}
// the classnams is optional so instead of doing if else we use cn property of shadcn to merge the classname if it does exist 