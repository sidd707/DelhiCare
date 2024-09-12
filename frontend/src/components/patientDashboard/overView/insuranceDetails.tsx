import React from 'react';
import { FaFilePdf, FaCalendarAlt } from "react-icons/fa";

interface Insurance {
  name: string;
  policyNumber: string;
  group: string;
  startDate: string;
  endDate: string;
}

interface InsuranceDetailsProps {
  insurances: Insurance[];
}

const InsuranceDetails: React.FC<InsuranceDetailsProps> = ({ insurances }) => {
  return (
    <div className="p-4 bg-white shadow rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Insurance Details</h3>
        <a href="/insuranceDetails" className="text-blue-500">View all</a>
      </div>
      {insurances.map((insurance, index) => (
        <div 
          key={index} 
          className="mb-4 p-2 rounded-md transition-colors duration-300 hover:bg-indigo-100"
        >
          <div className="flex justify-between items-center">
            <p className="font-semibold">{insurance.name}</p>
            <span>{insurance.policyNumber}</span>
          </div>
          <div className="flex justify-between items-center text-gray-600">
            <span className="flex items-center">
              <FaFilePdf className="mr-2" /> {insurance.group}
            </span>
            <span className="flex items-center">
              <FaCalendarAlt className="mr-2" /> {insurance.startDate}
            </span>
            <span className="flex items-center">
              <FaCalendarAlt className="mr-2" /> {insurance.endDate}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InsuranceDetails;
