'use client';

import { useState } from "react";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import { generatePdfSummary, storePdfSummaryAction } from "@/actions/upload-actions";
import UploadFormInput from "./upload-form-input";
import { useRouter } from "next/navigation";

export default function UploadForm() {
  const [loading, setLoading] = useState(false);
  const { startUpload } = useUploadThing("pdfUploader");
  const router = useRouter();

  const handleFileSubmit = async (file: File) => {
    setLoading(true);
    try {
      // Upload file to UploadThing
      const resp = await startUpload([file]);

      if (!resp || resp.length === 0) {
        toast.error("Upload failed, please try again");
        setLoading(false);
        return;
      }

      // Map UploadThing response
      const formattedResp = resp.map((f) => ({
        serverData: {
          userId: (f as any).metadata?.userId ?? "",
          file: { name: f.name, ufsUrl: f.ufsUrl },
        },
      })) as [
        {
          serverData: {
            userId: string;
            file: { name: string; ufsUrl: string };
          };
        }
      ];

      // Generate PDF summary (OpenAI → Gemini fallback)
      const result = await generatePdfSummary(formattedResp);
      if (!result.success || !result.data) {
        toast.error(result.message || "Failed to generate summary");
        setLoading(false);
        return;
      }

      const { summary, title } = result.data;
      const uploadedFile = resp[0];

      // Save summary to DB
      const storeResult = await storePdfSummaryAction({
        fileUrl: uploadedFile.ufsUrl,
        summary,
        title,
        fileName: uploadedFile.name,
      });

      if (!storeResult.success) {
        toast.error(storeResult.message || "Failed to save PDF summary");
        setLoading(false);
        return;
      }

      toast.success("PDF summary generated and saved successfully!");
      if (storeResult.data?.id) {
        router.push(`/summaries/${storeResult.data.id}`);
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Something went wrong during upload");
    } finally {
      setLoading(false);
    }
  };

  return <UploadFormInput onSubmit={handleFileSubmit} isLoading={loading} />;
}
