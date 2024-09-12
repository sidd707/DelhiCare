
const hospitals = [
  {
    name: 'All India Institute of Medical Sciences',
    availableBeds: 5,
    wardTypes: ['ICU', 'General', 'Emergency'],
    image: 'https://i.imgur.com/rYwnav1.jpg',
    location: 'AIIMS Campus, New Delhi',
    coordinates: { lat: 28.5672, lng: 77.2100 },
  },
  {
    name: 'Ambedkar Nagar Hospital',
    availableBeds: 0,
    wardTypes: ['ICU', 'Emergency'],
    image: 'https://i.imgur.com/WZ8VQcn.png',
    location: 'Dakshinpuri, New Delhi',
    coordinates: { lat: 28.5294, lng: 77.2687 },
  },
  {
    name: 'Ram Manohar Lohia Hospital',
    availableBeds: 2,
    wardTypes: ['General', 'Emergency'],
    image: 'https://i.imgur.com/yHLfMBQ.jpg',
    location: 'Baba Kharak Singh Marg, New Delhi',
    coordinates: { lat: 28.6328, lng: 77.2197 },
  },
];

const saved = () => {
  return (
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
      {/* Hospital Cards Section */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {hospitals.map((hospital, index) => (
          <a
            key={index}
            className="p-8 max-w-lg border border-indigo-300 rounded-2xl hover:shadow-blue-900 hover:shadow-sm hover:scale-105 transform transition duration-300 ease-in-out flex flex-col"
            href="#"
          >
            {/* Image Section */}
            <img
              src={hospital.image}
              alt={hospital.name}
              className="w-full h-48 object-cover shadow rounded-lg overflow-hidden border"
            />

            {/* Bottom Section */}
            <div className="mt-8">
              <h4 className="font-bold text-xl text-gray-900">{hospital.name}</h4>
              <p className="mt-2 text-gray-600">{hospital.location}</p>

              {/* Available Beds Section */}
              <div className="my-2">
                <span className="bg-blue-500 text-white rounded-md px-4 py-2 inline-block">
                  Available Beds: {hospital.availableBeds}
                </span>
              </div>

              {/* Ward Types */}
              <div className="my-2">
                <span className="border border-blue-500 text-blue-600 rounded-md px-4 py-2 inline-block">
                  {hospital.wardTypes.join(', ')}
                </span>
              </div>

              <div className="mt-5 text-right">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-gray-900"
                >
                  {hospital.availableBeds === 0 ? 'Join Queue' : 'View Details'}
                </button>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Placeholder for Login Form or Backend Integration */}
      {/* You can add the popup and backend integration logic here */}
    </div>
  );
};

export default saved;

