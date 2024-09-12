import React from 'react';

interface Prescription {
  name: string;
  dosage: string;
  avatar?: string; // Optional avatar URL
}

interface PrescriptionsCardProps {
  prescriptions: Prescription[];
}

const PrescriptionsCard: React.FC<PrescriptionsCardProps> = ({ prescriptions }) => {
  return (
    <div className="p-4 bg-white shadow rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Prescriptions</h3>
        <a href="/prescriptions" className="text-blue-500">View all</a>
      </div>
      {prescriptions.map((prescription, index) => (
        <div 
          key={index} 
          className="mb-4 flex items-center p-2 rounded-md transition-colors duration-300 hover:bg-indigo-100"
        >
          {prescription.avatar && (
            <img
              src={prescription.avatar}
              alt={prescription.name}
              className="w-10 h-10 rounded-full mr-4"
            />
          )}
          <div>
            <p className="font-semibold">{prescription.name}</p>
            <p className="text-gray-600">{prescription.dosage}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PrescriptionsCard;
