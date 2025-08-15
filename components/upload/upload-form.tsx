'use client';

import { useUploadThing } from "@/utils/uploadthing";
import UploadFormInput from "./upload-form-input";
import { z } from 'zod';
import { toast } from "sonner";
import { generatePdfSummary, storePdfSummaryAction } from "@/actions/upload-actions";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

const schema = z.object({
  file: z
    .instanceof(File, { message: 'Invalid File' })
    .refine((file) => file.size <= 20 * 1024 * 1024, {
      message: "File size must be less than 20MB",
    })
    .refine((file) => file.type.startsWith('application/pdf'), {
      message: "File must be a PDF",
    }),
});

export default function UploadForm() {
  const formRef= useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading]=useState(false);
   const router = useRouter();

    const { startUpload, routeConfig } = useUploadThing(
      'pdfUploader',
      {
        onClientUploadComplete: () => {
          console.log("uploaded successfully");


        },
        onUploadError: (err) => {
          console.error("error occurred while uploading", err);
          toast.error("error occured during uploading file",{
            description:err.message
          })
        },
        //@ts-ignore
        onUploadBegin: ({ file }) => {
          console.log('upload has begun for', file);
        },
      }
    );

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // so it doesn't refresh the page when we hot submit 

        try{
          setIsLoading(true)
          
           const formData = new FormData(e.currentTarget);
        const file = formData.get('file') as File; // “From this form, get the value of the field whose name is file.”

        // file validation to validate fields
        const validatedFields = schema.safeParse({ file });
        console.log(validatedFields);

        if (!validatedFields.success) {
            toast("❌Something went wrong",{
              description:  validatedFields.error.format().file?._errors?.[0] ?? 'Invalid File'
            })
            setIsLoading(false)
            return;
        }
        

        toast("Uploading PDF")

        // schema validation with zod
        // upload the file to uploadthing
        const resp = await startUpload([file]);
        if (!resp) {
          toast("Something went Wrong!!",{
            description:"Please Use a different File."
          })
          setIsLoading(false)
            return;
        }


         toast("Hang tight! Our AI is reading through your document",{
          description:"Processing PDF"
        })
        // parse the pdf through lang chain
        const result= await generatePdfSummary(resp);
        
     const {data=null ,message=null}=result || {};


     if(data){
      let storeResult:any
        toast("saving your pdf summary")
        

          if(data.summary){
       storeResult= await storePdfSummaryAction({
          summary:data.summary,
          fileUrl:resp[0].serverData.file.ufsUrl,
          title:data.title,
          fileName:file.name
        })
     }

     toast("Summary generated",{
      description:"Your summary has been successfully summerised and saved"
     })
     
   
        console.log(resp)
        console.log({result})
        // summarize the pdf using AI
        // save the summary to the database and 
        // redirect to the [id] summary page
        console.log("submitted");
           formRef.current?.reset();
           router.push(`/summaries/${storeResult.data.id}`);

        // redirect the user to the [id] for summary page
    }
  

        }
        catch(err){
          console.error("error occured", err);
          setIsLoading(false)
          formRef.current?.reset();
        }
        finally{
          setIsLoading(false);
        }

       
    };

    return (
        <div className="flex flex-col gap-8 max-w-2xl w-full mx-auto">
            <UploadFormInput isLoading={isLoading} ref={formRef} onSubmit={handleSubmit} />
        </div>
    );
}

// Why .get()?
// The FormData API provides .get(name) to retrieve the first value for a given field name.
// You can also use .getAll(name) if you expect multiple values (like multiple selected files).
