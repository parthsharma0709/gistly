'use server'

import { getDbConnection } from "@/lib/db";
import { generateSummaryFromGemini } from "@/lib/geminiai";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";
import { auth } from "@clerk/nextjs/server";
import { error } from "console";
import { toast } from "sonner";
import { any } from "zod";
import { _success } from "zod/v4/core";

interface PdfSummaryType {
  
    fileUrl:string,
    summary:string,
    title:string,
    fileName:string

}


export async function generatePdfSummary(uploadResponse: [ {
    serverData:{
        userId:string;
        file:{
            ufsUrl:string;
            name:string;
        };
    }
} ]
) {
   if(!uploadResponse){
    return {
        success:false,
        message:"file upload failed",
        data:null
    }
   }
   const {serverData :{
    userId,
    file:{ufsUrl:pdfUrl,name:FileName},
},
} = uploadResponse[0]

if(!pdfUrl){
    return {
        success:false,
        message:"file upload failed",
        data:null
    }
}

 try{
    const pdfText= await fetchAndExtractPdfText(pdfUrl);
    console.log(pdfText)
    let summary;
    try{
     summary= await generateSummaryFromOpenAI(pdfText);
     console.log({summary})
    }
    catch(error){
console.error(error);
       // call gemini
       if(error instanceof Error && error.message=== 'RATE_LIMIT_EXCEEDED'){
        try{
            summary= await generateSummaryFromGemini(pdfText)

        }
        catch(geminiError){
            console.error('Gemini API failed after chatgpt quota exceeded');
            throw new Error("Failed to generate summary with available AI providers")
        }
       }
    }

    if(!summary){
        return {
        success:false,
        message:"Failed to generate summary",
        data:null
    }
    }
    return {
        success:true,
        message:"summary has generated successfully",
        data:{
            summary
        }
    }
 }
 catch(error){
    return {
        success:false,
        message:"file upload failed",
        data:null
    }
 }
    
}

async function savePdfSummary({{userId,fileUrl,summary,title,fileName,}:{userId:string,fileUrl:string,summary:string,title:string,fileName:string}}) {
    // sql inserting pdf summary
    try{
        const sql= await getDbConnection();
        await sql `INSERT INTO pdf_summaries (user_id,
         original_file_url,
          summary_text,
           status, 
           title, 
           file_name
           )
VALUES (
      ${userId}
      ${fileUrl}
      ${summary}
      ${title}
      ${fileName}
                        
);`

    }
    catch(error){
        console.error("error saving pdf summary",error);
        throw error;
    }
    
}

export async function storePdfSummaryAction({
      userId,
            fileUrl,
            summary,
            title,
            fileName
}) {
    // user is logged in and has an user id 
    // saved pdf summary
    // saved pdf
    let savePdfSummary;
    try {
        const {userId}= await auth();
        if(!userId){
            return {
                success:false,
                message:"user not found"
            }
        }
        savePdfSummary= await savePdfSummary({
            userId,
            fileUrl,
            summary,
            title,
            fileName
        });


    }
    catch(error){
         return {
        success:false,
        message: error instanceof Error ? error.message : "Error saving pdf"
    }

    }
    
}

