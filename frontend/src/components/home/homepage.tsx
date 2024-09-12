import React from "react";
import { BgVideo } from "../bgvideo/Bgvideo"; // Ensure this path is correct
import { FlipWordsDemo } from "../../plugins/flipwords";
import LiveStats from "../trackrecord/liveNumber";
import { TimelineDemo } from "../../plugins/timelineSec";
import { Cover } from "../ui/cover";
import HospitalFeatures from "../layouts/hospital";
import { AiOutlineSlackSquare } from "react-icons/ai";
import LocationsGrid from "../layouts/locationsGrid";

const HomePage: React.FC = () => {
  return (
    <div className="relative bg-stone-200">
      {/* Video Background Section */}
      <div className="relative w-full pt-6 sm:pt-8 lg:pt-10 pb-16 sm:pb-20 lg:pb-24">
        <div className="relative w-full bg-neutral-950 lg:w-[90vw] xl:w-[97vw] max-w-none mx-auto rounded-xl overflow-hidden">
          {/* Video Background */}
          <BgVideo className="rounded-xl" />

          {/* Overlay Content */}
          <div className="absolute inset-0 flex flex-col justify-center p-4 sm:p-6 md:p-8 lg:p-10">
            {/* Top-left Text */}
            <div className="absolute top-4 sm:top-8 left-4 sm:left-8 text-white flex items-center space-x-2">
              <AiOutlineSlackSquare className="text-xl sm:text-2xl md:text-3xl" /> {/* Icon adjusted */}
              <h2 className="text-base sm:text-lg md:text-xl font-bold">Delhi Care</h2>
            </div>

            {/* Quote Text (Bottom-left) */}
            <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 text-white">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-base sm:text-lg font-bold">
                  &ldquo;
                </div>
                <FlipWordsDemo />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats and Features Section */}
      <div className="flex flex-col items-center justify-center mt-10 px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-sans font-bold bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-neutral-600 via-neutral-900 to-neutral-950 [text-shadow:0_0_rgba(0,0,0,0.1)]">
            Your Beacon of Health and Healing <Cover>Excellence.</Cover>
          </h2>
        </div>

        <LiveStats />
        <HospitalFeatures />
      </div>

      {/* Timeline Section */}
      <div className="mt-16 px-4 sm:px-6 md:px-8 lg:px-10">
        <TimelineDemo />
      </div>

      {/* Locations Section */}
      <div className="mt-20 px-4 sm:px-6 md:px-8 lg:px-10">
        <LocationsGrid />
      </div>
    </div>
  );
};

export default HomePage;
