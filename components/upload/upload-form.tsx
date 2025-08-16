'use client';

import { useUploadThing } from "@/utils/uploadthing";
import UploadFormInput from "./upload-form-input";
import { z } from 'zod';
import { toast } from "sonner";
import { generatePdfSummary, storePdfSummaryAction } from "@/actions/upload-actions";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingSkeleton from "./loading-skelton";

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
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { startUpload } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("uploaded successfully");
    },
    onUploadError: (err) => {
      console.error("error occurred while uploading", err);
      toast.error("error occurred during uploading file", {
        description: err.message,
      });
    },
    // @ts-ignore
    onUploadBegin: ({ file }) => {
      console.log("upload has begun for", file);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const formData = new FormData(e.currentTarget);
      const file = formData.get("file") as File;

      const validatedFields = schema.safeParse({ file });
      console.log(validatedFields);

      if (!validatedFields.success) {
        toast("❌ Something went wrong", {
          description:
            validatedFields.error.format().file?._errors?.[0] ?? "Invalid File",
        });
        setIsLoading(false);
        return;
      }

      toast("Uploading PDF");

      const resp = await startUpload([file]);
      if (!resp) {
        toast("Something went Wrong!!", {
          description: "Please Use a different File.",
        });
        setIsLoading(false);
        return;
      }

      toast("Hang tight! Our AI is reading through your document", {
        description: "Processing PDF",
      });

      const result = await generatePdfSummary(resp);
      const { data = null } = result || {};

      if (data) {
        let storeResult: any;

        toast("Saving your PDF summary");

        if (data.summary) {
          storeResult = await storePdfSummaryAction({
            summary: data.summary,
            fileUrl: resp[0].serverData.file.ufsUrl,
            title: data.title,
            fileName: file.name,
          });
        }

        toast("Summary generated", {
          description: "Your summary has been successfully summarised and saved",
        });

        console.log(resp);
        console.log({ result });

        formRef.current?.reset();
        router.push(`/summaries/${storeResult.data.id}`);
      }
    } catch (err) {
      console.error("error occurred", err);
      formRef.current?.reset();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-2xl w-full mx-auto">
      <UploadFormInput
        isLoading={isLoading}
        ref={formRef}
        onSubmit={handleSubmit}
      />

     {isLoading && (
  <div className="flex flex-col items-center gap-4 text-center w-full">
    {/* Spinner */}
    <div className="flex items-center gap-3">
      <svg
        className="animate-spin h-6 w-6 text-rose-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>
      <p className="text-base font-medium text-gray-700 dark:text-gray-300">
        Processing your PDF…
      </p>
    </div>

    {/* Subtext */}
    <p className="text-sm text-gray-500 dark:text-gray-400">
      Hang tight while we extract and summarize your document
    </p>

    {/* Skeleton Preview */}
    <LoadingSkeleton/>
  </div>
)}

    </div>
  );
}
