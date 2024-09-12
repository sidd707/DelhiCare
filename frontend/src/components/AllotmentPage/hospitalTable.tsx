import React, { useEffect, useState } from 'react';

interface Hospital {
  name: string;
  availableBeds: number;
  wardTypes: string[];
  image: string;
  location: string;
  latitude: number;
  longitude: number;
  patientsInQueue?: number;
}

interface HospitalTableProps {
  submittedFormData: any;
}

// Example hospital data with latitude and longitude
const hospitals: Hospital[] = [
  {
    name: 'All India Institute of Medical Sciences',
    availableBeds: 5,
    wardTypes: ['ICU', 'General', 'Emergency'],
    image: 'https://i.imgur.com/rYwnav1.jpg',
    location: 'AIIMS Campus, New Delhi',
    latitude: 28.5672,
    longitude: 77.2100,
  },
  {
    name: 'Ambedkar Nagar Hospital',
    availableBeds: 10,
    patientsInQueue: 0,
    wardTypes: ['ICU', 'Emergency'],
    image: 'https://i.imgur.com/WZ8VQcn.png',
    location: 'Dakshinpuri, New Delhi',
    latitude: 28.4975,
    longitude: 77.2588,
  },
  {
    name: 'Ram Manohar Lohia Hospital',
    availableBeds: 2,
    wardTypes: ['General', 'Emergency'],
    image: 'https://i.imgur.com/yHLfMBQ.jpg',
    location: 'Baba Kharak Singh Marg, New Delhi',
    latitude: 28.6257,
    longitude: 77.2106,
  },
  {
    name: 'Acharya Shree Bhikshu Hospital',
    availableBeds: 3,
    wardTypes: ['ICU', 'General'],
    image: 'https://i.imgur.com/tMxp0tK.png',
    location: 'Moti Nagar, New Delhi',
    latitude: 28.6586,
    longitude: 77.1513,
  },
  {
    name: 'Lok Nayak Hospital',
    availableBeds:8 ,
    patientsInQueue: 0,
    wardTypes: ['General', 'Emergency'],
    image: 'https://i.imgur.com/pKjYa1R.jpg',
    location: 'Jawaharlal Nehru Marg, Delhi Gate, New Delhi',
    latitude: 28.6391,
    longitude: 77.2448,
  },
];

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const toRadians = (degrees: number) => degrees * (Math.PI / 180);

  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in kilometers
}

const HospitalTable: React.FC<HospitalTableProps> = ({ submittedFormData }) => {
  const [sortedHospitals, setSortedHospitals] = useState<Hospital[]>(hospitals);

  useEffect(() => {
    if (submittedFormData && submittedFormData.latitude && submittedFormData.longitude) {
      const userLat = parseFloat(submittedFormData.latitude);
      const userLon = parseFloat(submittedFormData.longitude);

      const sorted = [...hospitals].sort((a, b) => {
        const distanceA = calculateDistance(userLat, userLon, a.latitude, a.longitude);
        const distanceB = calculateDistance(userLat, userLon, b.latitude, b.longitude);
        return distanceA - distanceB;
      });

      setSortedHospitals(sorted);
    }
  }, [submittedFormData]);

  return (
    <div className="relative max-w-full rounded-lg bg-white mt-24 mx-auto px-4 sm:px-6 lg:px-24">
      <div className="text-left pt-6 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Hospital Beds Availability</h1>
        <p className="text-lg sm:text-xl text-gray-600">
          List of hospitals with available beds, facilities, and their distance from you.
        </p>
      </div>

      <div className="hidden lg:block overflow-hidden">
        <table className="w-full text-left table-auto">
          <thead>
            <tr className="text-xl">
              <th className="w-1/6"></th>
              <th className="p-6 text-left">Hospitals</th>
              <th className="p-6 text-left">Location</th>
              <th className="p-6 text-left whitespace-nowrap">Beds Available</th>
              <th className="p-6 text-left">Ward Types</th>
              <th className="p-6 text-left">Distance (km)</th>
              <th className="p-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedHospitals.map((hospital, index) => (
              <tr
                key={index}
                className="bg-indigo-100/10 border-b transform hover:scale-[1.02] transition-transform duration-300 ease-in-out"
              >
                <td className="p-6">
                  <img
                    src={hospital.image}
                    alt={hospital.name}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </td>
                <td className="p-6 text-left">
                  <div className="font-semibold text-lg whitespace-nowrap">
                    {hospital.name}
                  </div>
                  <div className="text-base text-gray-500 lg:hidden">
                    {hospital.location}
                  </div>
                </td>
                <td className="p-6 text-left hidden lg:table-cell">
                  <div className="text-base text-gray-500">
                    {hospital.location}
                  </div>
                </td>
                <td className="p-6 text-left">
                  {hospital.availableBeds > 0 ? (
                    <span className="inline-block bg-green-100 text-green-800 text-sm px-3 py-1 rounded whitespace-nowrap">
                      Available Beds: {hospital.availableBeds}
                    </span>
                  ) : (
                    <span className="inline-block bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded">
                      In Queue: {hospital.patientsInQueue}
                    </span>
                  )}
                </td>
                <td className="p-6 text-left">
                  <div className="text-base lg:text-lg">
                    {hospital.wardTypes.join(', ')}
                  </div>
                </td>
                <td className="p-6 text-left">
                  {submittedFormData && submittedFormData.latitude && submittedFormData.longitude ? (
                    <div className="text-base lg:text-lg">
                      {calculateDistance(parseFloat(submittedFormData.latitude), parseFloat(submittedFormData.longitude), hospital.latitude, hospital.longitude).toFixed(2)} km
                    </div>
                  ) : (
                    <div className="text-base lg:text-lg">
                      N/A
                    </div>
                  )}
                </td>
                <td className="p-6 text-right">
                  <button
                    type="button"
                    className="inline-flex items-center bg-blue-500 text-white font-semibold py-2 px-4 text-md rounded hover:bg-indigo-100/10 border hover:border-blue-500 hover:text-black whitespace-nowrap"
                  >
                    {hospital.availableBeds === 0 ? 'Join Queue' : 'Allot Bed'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="lg:hidden">
        {sortedHospitals.map((hospital, index) => (
          <div
            key={index}
            className="bg-indigo-100/10 border-b transform hover:scale-[1.02] transition-transform duration-300 ease-in-out rounded-lg p-4 sm:p-6 mb-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center">
              <img
                src={hospital.image}
                alt={hospital.name}
                className="w-full sm:w-32 h-32 object-cover rounded-lg mb-4 sm:mb-0 sm:mr-6"
              />
              <div className="flex-grow">
                <div className="font-semibold text-lg sm:text-xl">
                  {hospital.name}
                </div>
                <div className="text-sm sm:text-base text-gray-500 mb-2">
                  {hospital.location}
                </div>
                <div className="text-sm sm:text-base mb-2">
                  {hospital.wardTypes.join(', ')}
                </div>
                <div className="text-sm sm:text-base mb-2">
                  {submittedFormData && submittedFormData.latitude && submittedFormData.longitude ? (
                    calculateDistance(parseFloat(submittedFormData.latitude), parseFloat(submittedFormData.longitude), hospital.latitude, hospital.longitude).toFixed(2)
                  ) : (
                    'N/A'
                  )} km
                </div>
                <div>
                  {hospital.availableBeds > 0 ? (
                    <span className="inline-block bg-green-100 text-green-800 text-xs sm:text-sm px-2 sm:px-3 py-1 rounded">
                      Available Beds: {hospital.availableBeds}
                    </span>
                  ) : (
                    <span className="inline-block bg-yellow-100 text-yellow-800 text-xs sm:text-sm px-2 sm:px-3 py-1 rounded">
                      In Queue: {hospital.patientsInQueue}
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right mt-4 sm:mt-0">
                <button
                  type="button"
                  className="inline-flex items-center bg-blue-500 text-white font-bold py-1 sm:py-2 px-3 sm:px-4 text-sm sm:text-md rounded hover:bg-indigo-100/10"
                >
                  {hospital.availableBeds === 0 ? 'Join Queue' : 'Allot Bed'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HospitalTable;
