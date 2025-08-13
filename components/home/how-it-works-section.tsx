import { ReactNode } from "react";
import BgGradient from "../common/bg-gradient";
import { BrainCircuit, FileOutput, FileText } from "lucide-react";

type Step={
    icon:ReactNode;
    label:string;
    description:string
};

const steps:Step[]= [
    {
        icon:<FileText size={64} strokeWidth={1.5}/>,
        label:"Upload your PDF",
        description:"Simply drag and drop your PDF or click to upload"
    },
     {
        icon:<BrainCircuit size={64} strokeWidth={1.5}/>,
        label:"AI Analysis",
        description:"Our AI process and analyzes your document instantly"
    },
     {
        icon:<FileOutput size={64} strokeWidth={1.5}/>,
        label:"Get Summary",
        description:"Receive a clear , concise summary of your document"
    },

]


export default function HowItWorksSection(){
    return (
        <section className="relative overflow-hidden bg-gray-50">
            <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 ">
             <BgGradient/>
             <div className="text-center mb-16 ">
                <h2 className="font-bold text-xl uppercase mb-4 text-rose-500">How it works</h2>
                <h3 className="font-bold text-3xl max-w-2xl mx-auto"> Transform any PDF into an easy-to-digest in just three simple steps</h3>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative">
                {
                     steps.map((step,idx)=> (
                       <StepItem key={idx} {...step} />
                       ) )
                }
             </div>
            </div>
        </section>
    )
}

function StepItem({icon,label,description}:Step){
    return <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xs border border-white/10 hover:border-rose-500/5 transition-colors group w-full">
       {icon}
        <h4>{label}</h4>
        <p>{description}</p>
    </div>

}