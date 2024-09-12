import React, { useState, useEffect } from "react";

const LiveStats: React.FC = () => {
  const [bedsAllocated, setBedsAllocated] = useState<number>(516);
  const [doctorsAvailable] = useState<number>(140);
  const [patientsRecovered, setPatientsRecovered] = useState<number>(125800);

  // Simulate dynamic updates
  useEffect(() => {
    const interval = setInterval(() => {
      setBedsAllocated((prev) => prev + 1);
      setPatientsRecovered((prev) => prev + 50);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-start items-start mb-10 md:space-x-10 space-y-8 md:space-y-0 mt-10">
      <div className="text-start">
        <h2 className="text-[40px] sm:text-[50px] md:text-[60px] font-bold text-black">
          {bedsAllocated.toLocaleString()}+
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-600">Beds Allocated</p>
      </div>
      <div className="h-0.5 w-full md:h-24 md:w-auto border-b md:border-l border-black"></div>
      <div className="text-center">
        <h2 className="text-[40px] sm:text-[50px] md:text-[60px] font-bold text-gray-900">
          {doctorsAvailable}+
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-600">Specialist Doctors</p>
      </div>
      <div className="h-0.5 w-full md:h-24 md:w-auto border-b md:border-l border-black"></div>
      <div className="text-center">
        <h2 className="text-[40px] sm:text-[50px] md:text-[60px] font-bold text-gray-900">
          {patientsRecovered.toLocaleString()}+
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-600">Patients Recovered</p>
      </div>
    </div>
  );
};

export default LiveStats;

