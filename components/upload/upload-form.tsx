'use client';

import { useUploadThing } from "@/utils/uploadthing";
import UploadFormInput from "./upload-form-input";
import { z } from 'zod';

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
    const { startUpload, routeConfig } = useUploadThing(
      'pdfUploader',
      {
        onClientUploadComplete: () => {
          console.log("uploaded successfully");
        },
        onUploadError: (err) => {
          console.error("error occurred while uploading", err);
        },
        //@ts-ignore
        onUploadBegin: ({ file }) => {
          console.log('upload has begun for', file);
        },
      }
    );

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // so it doesn't refresh the page when we hot submit 

        const formData = new FormData(e.currentTarget);
        const file = formData.get('file') as File; // “From this form, get the value of the field whose name is file.”

        // file validation to validate fields
        const validatedFields = schema.safeParse({ file });
        console.log(validatedFields);

        if (!validatedFields.success) {
            console.log(
                //@ts-ignore
                validatedFields.error.format().file?._errors?.[0] ?? 'Invalid File'
            );
            return;
        }

        // schema validation with zod
        // upload the file to uploadthing
        const resp = await startUpload([file]);
        if (!resp) {
            return;
        }

        // parse the pdf through lang chain
        // summarize the pdf using AI
        // save the summary to the database and 
        // redirect to the [id] summary page
        console.log("submitted");
    };

    return (
        <div className="flex flex-col gap-8 max-w-2xl w-full mx-auto">
            <UploadFormInput onSubmit={handleSubmit} />
        </div>
    );
}

// Why .get()?
// The FormData API provides .get(name) to retrieve the first value for a given field name.
// You can also use .getAll(name) if you expect multiple values (like multiple selected files).
