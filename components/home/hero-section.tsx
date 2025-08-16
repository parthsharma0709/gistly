import { ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { Button,  } from "../ui/button";
import { MotionDiv, MotionH1, MotionH2, MotionSection, MotionSpan } from "../common/motion-wrapper";
import { containerVariants, itemVariants } from "@/utils/constants";

export const buttonVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 300,
    },
  },
};


export default function HeroSection() {
  return (
    <MotionSection
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative mx-auto flex flex-col z-0 items-center justify-center py-16 sm:py-20 lg:pb-28 transition-all animate-in lg:px-12 max-w-7xl"
    >
      <MotionDiv 
       variants={itemVariants}
      >
        {/* Badge Section */}
        <div className="flex justify-center items-center">
          <div className="relative p-[1px] overflow-hidden rounded-full bg-gradient-to-r from-rose-200 via-rose-500 to-rose-800 animate-gradient-x group">
            <Badge
              variant={"secondary"}
              className="relative flex items-center px-4 py-2 text-base font-medium bg-white rounded-full group-hover:bg-gray-50 transition-colors duration-200"
            >
              <Sparkles className="h-6 w-6 mr-2 text-rose-600 animate-pulse" />
              <p className="text-base text-rose-600">Powered by AI</p>
            </Badge>
          </div>
        </div>

        {/* Hero Heading */}
        <MotionH1 variants={itemVariants} className="mt-4 text-5xl text-center py-6 font-bold">
          Transform PDFs into{" "}
          <MotionSpan className="relative inline-block">
            <MotionSpan whileHover={buttonVariants}  className="relative z-10">concise</MotionSpan>
            <MotionSpan whileHover={buttonVariants} 
              className="absolute inset-0 bg-rose-200/50 -rotate-2 rounded-lg transform -skew-y-1"
              aria-hidden="true"
            ></MotionSpan>
          </MotionSpan>{" "}
          summaries
        </MotionH1>

        {/* Sub Heading */}
        <MotionH2 variants={itemVariants} className="text-lg text-gray-600 sm:text-xl lg:text-2xl text-center px-4 lg:px-0 lg:max-w-4xl">
          Get a beautiful summary reel of the document in seconds.
        </MotionH2>

        {/* CTA Button */}
        
        <MotionDiv variants={itemVariants} whileHover={buttonVariants} className="flex justify-center items-center">
          <Button
            variant="link"
            className="text-white mt-6 text-base sm:text-lg lg:text-xl rounded-full px-8 sm:px-10 lg:px-12 py-6 sm:py-7 lg:py-8 lg:mt-16 bg-gradient-to-r from-slate-900 to-rose-500 hover:from-rose-500 hover:to-slate-900 hover:no-underline font-bold shadow-lg transition-all duration-300"
          >
            <Link href="/#pricing" className="flex gap-2 items-center">
              <MotionSpan whileHover={buttonVariants}  >Try Gistly</MotionSpan>
              <ArrowRight className="animate-pulse" />
            </Link>
          </Button>
        </MotionDiv>
      </MotionDiv>
    </MotionSection>
  );
}
