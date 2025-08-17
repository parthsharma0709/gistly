import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { link } from 'fs';

export default function CTASection() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900">
            Ready to save hours of reading time?
          </h2>

          {/* Subtext */}
          <p className="max-w-2xl text-lg text-gray-600">
            Let our AI summarize your documents instantly so you can focus on what really matters.
          </p>

          {/* Buttons */}
          <Button
            size={'lg'}
            variant={'link'}
            className="w-full min-[400px]:w-auto bg-linear-to-r from-slate-900 to-rose-500 hover:from-rose-500 hover:to-slate-900 hover:text-white text-white transition-all duration-300"
          >
            <Link href="#pricing" className=" flex items-center justify-center !no-underline">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
