import BgGradient from "@/components/common/bg-gradient";
import SummaryHeader from "@/components/summaries/summary-header";
import { getSummaryById } from "@/lib/summaries";
import { notFound } from "next/navigation";



export default async  function SummaryPage(props:{params:Promise<{id:string}>}){
    const params= await props.params;
    const id= params.id;

    const summary= await getSummaryById(id);
    if(!summary){
        notFound();
    }
    const {title, summary_text,file_name}=summary;
    return (
        <div className="relative isolate min-h-screen bg-linear-to-b from-rose-50/40 to-white">
            <BgGradient/>
            <div className="container mx-auto flex flex-col gap-4">
   <div className="px-4 sm:px-6 lg:px-8 sm:py-12 lg:py-24  py-6">
    <div className="flex flex-col">
        
      <SummaryHeader title={title}/>
    </div>
    {file_name && <SourceInfo fileName={file_name}/>}
   </div>
            </div>
            </div>
    )
}