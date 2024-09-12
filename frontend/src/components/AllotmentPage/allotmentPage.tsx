import React, { useEffect, useState, useRef } from "react";
import SlideComponent from "../ui/container-scroll-animation";
import HospitalTable from "./hospitalTable";
import { PatientForm } from "./patientForm";

const AllotmentPage: React.FC = () => {
  const [isPatientFormVisible, setPatientFormVisible] = useState(false);
  const [submittedFormData, setSubmittedFormData] = useState<any>(null);
  const hospitalTableRef = useRef<HTMLDivElement | null>(null);

  const handleFormSubmit = (formData: any) => {
    setSubmittedFormData(formData);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPatientFormVisible(true);
        } else {
          setPatientFormVisible(false);
        }
      },
      { threshold: 0.4 }
    );

    if (hospitalTableRef.current) {
      observer.observe(hospitalTableRef.current);
    }

    return () => {
      if (hospitalTableRef.current) {
        observer.unobserve(hospitalTableRef.current);
      }
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isPatientFormVisible ? "hidden" : "auto";
  }, [isPatientFormVisible]);

  return (
    <div className="bg-stone-100 w-full pt-6 sm:pt-8 lg:pt-10 pb-16 sm:pb-20 lg:pb-24">
      <div className="w-full bg-blue-600 lg:w-[90vw] xl:w-[97vw] max-w-none mx-auto rounded-xl text-white p-8 sm:p-10 md:p-12 lg:p-20 text-left">
        <div className="flex flex-col md:flex-row items-center justify-between w-full">
          <div className="md:w-1/2 text-left">
            <h2 className="text-lg font-semibold text-white uppercase tracking-wide">
              Bed Allotment for Hospitals
            </h2>
            <h1 className="text-lg md:text-6xl font-bold text-white mt-6 leading-tight">
              Find the nearest hospital with available beds for immediate care.
            </h1>
            <p className="mt-8 text-xl text-white">
              Use our smart bed allotment system to secure your bed in ICU,
              Emergency, or General wards at the nearest available hospital.
            </p>
            <button
              className="mt-10 px-10 py-5 bg-white text-blue-600 font-semibold rounded-md text-xl"
              onClick={() => setPatientFormVisible(true)}
            >
              Register AllotmentForm
            </button>
          </div>

          <div className="md:w-1/2 mt-12 md:mt-0 flex items-center justify-center">
            <img
              src="https://i.imgur.com/SpniTHG.png"
              alt="Bed Allotment"
              className="w-full h-auto md:w-2/3 lg:w-3/3"
            />
          </div>
        </div>

        <div className="w-full mt-28">
          <SlideComponent />
        </div>
      </div>

      <div ref={hospitalTableRef} className="overflow-auto">
        <HospitalTable submittedFormData={submittedFormData} />
      </div>

      {isPatientFormVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="w-full max-w-md">
            <PatientForm 
              onClose={() => setPatientFormVisible(false)} 
              onSubmit={handleFormSubmit} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AllotmentPage;




