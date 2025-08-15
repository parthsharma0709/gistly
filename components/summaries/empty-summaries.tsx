import { FileText } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function EmptySummaryState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <FileText className="w-20 h-20 text-gray-400 mb-6" />

      <h3 className="text-2xl font-semibold text-gray-800 mb-2">
        No summaries to display
      </h3>
      <p className="text-gray-500 mb-6 max-w-xs">
        Upload your first PDF to get started with Gistly and generate summaries instantly.
      </p>

      <Link href="/upload">
        <Button
          
          className="bg-gradient-to-r from-rose-500 to-rose-700 text-white px-6 py-3 rounded-lg shadow-lg hover:from-rose-600 hover:to-rose-800 transition-all duration-300 hover:no-underline"
          variant="link"
        >
          <a>Create your first Summary</a>
        </Button>
      </Link>
    </div>
  );
}
