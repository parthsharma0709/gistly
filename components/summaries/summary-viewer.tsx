'use client';
import { useState, useEffect, useRef } from "react";
import { Card } from "../ui/card";
import { NavigationControls } from "./navigation-control";
import ProgessBar from "./progress-bar";
import { parseSection } from "@/utils/summary-helper";
import ContentSection from "./content-section";

const SectionTitle = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-col gap-2 mb-6  top-0 pt-2 pb-4 bg-background/80 backdrop-blur-xs z-10">
      <h2 className="text-3xl lg:text-4xl font-bold text-center flex items-center justify-center gap-2">
        {title}
      </h2>
    </div>
  );
};

export default function SummaryViewer({ summary }: { summary: string }) {
  const sections = summary
    .split("\n# ") // split on headings
    .map(section => section.trim())
    .filter(Boolean)
    .map(parseSection);

  const [currentSection, setCurrentSection] = useState(0);
  const [sectionTimes, setSectionTimes] = useState<number[]>(() =>
    new Array(sections.length).fill(0)
  );

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Start timer when currentSection changes
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setSectionTimes(prevTimes => {
        const newTimes = [...prevTimes];
        newTimes[currentSection] += 1; // increment seconds for current section
        return newTimes;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentSection]);

  const handleNext = () => {
    setCurrentSection(prev => Math.min(prev + 1, sections.length - 1));
  };

  const handlePrevious = () => {
    setCurrentSection(prev => Math.max(prev - 1, 0));
  };

  return (
    <Card
      className="relative px-2
        h-[500px] sm:h-[600px] lg:h-[700px]
        w-full xl:w-[600px]
        overflow-hidden
        bg-linear-to-br from-background via-background/95
        to-rose-500/5
        backdrop-blur-lg shadow-2xl rounded-3xl
        border border-rose-500/10"
    >
      <ProgessBar sections={sections} currentSection={currentSection} />

      <div className="absolute top-2 right-4 text-sm text-gray-500">
        ⏱ {sectionTimes[currentSection]}s
      </div>

      <div className="h-full overflow-y-auto pt-12 sm:pt-16 pb-20 sm:pb-24 scrollbar-hide">
        <div className="px-4 sm:px-6">
          <div className="p-4 border border-rose-500/20 rounded-xl shadow-sm bg-background/50">
            <SectionTitle title={sections[currentSection]?.title || ""} />
            <ContentSection
              title={sections[currentSection]?.title || " "}
              points={sections[currentSection]?.points || []}
            />
          </div>
        </div>
      </div>

      <NavigationControls
        currentSection={currentSection}
        totalSections={sections.length}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSectionSelect={setCurrentSection}
      />
    </Card>
  );
}
