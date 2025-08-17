import { ArrowRight, Sparkles } from 'lucide-react';
import BgGradient from './bg-gradient';
import { Button } from '../ui/button';
import Link from 'next/link';

export default function UpgradeRequired() {
  return (
    <div className="relative min-h-[50vh]">
      <BgGradient />
      <div className="container px-8 py-16">
        <div className="flex flex-col items-center justify-center gap-8 text-center max-w-2xl mx-auto">
          <div className="">
            <Sparkles className="w-6 h-6 " />
            <span className="text-sm font-medium uppercase tracking-wider">Premium Feature</span>
          </div>
          <h1
            className="text-4xl font-extrabold tracking-tight text-center 
  bg-gradient-to-r from-rose-600 via-red-500 to-rose-700 
  bg-clip-text text-transparent 
  drop-shadow-md p-4 rounded-xl 
  transition-all duration-300 hover:scale-105"
          >
            Subscription Required
          </h1>

          <p className="text-lg border-2 leading-8 text-gray-600 border-rose-600 bg-white/50 backdrop-blur-xs border-dashed max-w-xl p-6 ">
            You need to upgrade to the Basic Free Plan to the Pro plan to access this feature
          </p>
          <Button
            asChild
            className="bg-linear-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 text-white"
          >
            <Link href={'/#pricing'} className="flex gap-2 items-center">
              View Pricing Plans
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
