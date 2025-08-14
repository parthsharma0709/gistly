// upload-form-input.tsx
'use client';

import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface UploadFormInputProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function UploadFormInput({ onSubmit }: UploadFormInputProps) {
    return (
        <form className="flex flex-col gap-6" onSubmit={onSubmit}>
          <div className="flex justify-end gap-6">
              <Input 
              type="file" 
              id="file" 
              name="file" 
              accept="application/pdf" 
              required 
              className="" />
          </div>
            <Button type="submit">
                Upload Your PDF
            </Button>
        </form>
    );
}
