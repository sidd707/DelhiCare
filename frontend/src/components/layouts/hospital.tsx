import React from 'react';

const HospitalFeatures: React.FC = () => {
  return (
    <div className="bg-neutral-900 rounded-lg mb-10 text-white px-6 py-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row text-center md:divide-x md:divide-neutral-700">
        {/* Bed Allotment Section */}
        <div className="flex-1 p-6 bg-neutral-900 border-b border-neutral-700 md:border-b-0">
          <h2 className="text-3xl sm:text-4xl font-bold">10,000+ Beds Available</h2>
          <h3 className="text-lg font-semibold mt-4">Bed Allotment</h3>
          <p className="mt-2 text-sm sm:text-base">
            Find and secure your bed in real-time from all government hospitals in Delhi.
          </p>
        </div>

        {/* Appointment Booking Section */}
        <div className="flex-1 p-6 bg-neutral-900 border-b border-neutral-700 md:border-b-0">
          <h2 className="text-3xl sm:text-4xl font-bold">100+ Departments</h2>
          <h3 className="text-lg font-semibold mt-4">Appointment Booking</h3>
          <p className="mt-2 text-sm sm:text-base">
            Book appointments with top specialists across all medical fields.
          </p>
        </div>

        {/* Health Reports Section */}
        <div className="flex-1 p-6 bg-neutral-900">
          <h2 className="text-3xl sm:text-4xl font-bold">Health Reports Anytime</h2>
          <h3 className="text-lg font-semibold mt-4">Accessible Online</h3>
          <p className="mt-2 text-sm sm:text-base">
            Easily check and download your health reports from the comfort of your home.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HospitalFeatures;
