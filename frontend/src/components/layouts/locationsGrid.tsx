import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles

interface Location {
  title: string;
  subtitle: string;
  imageUrl: string;
}

const Locations: React.FC = () => {
  const locations: Location[] = [
    {
      title: 'All India Institute of Medical Sciences',
      subtitle: 'AIIMS Campus, Ansari Nagar East, New Delhi',
      imageUrl: "https://i.imgur.com/rYwnav1.jpg"
    },
    {
      title: 'Ambedkar Nagar Hospital',
      subtitle: 'Block-B, Sector-5, Dakshinpuri, New Delhi',
      imageUrl: 'https://i.imgur.com/WZ8VQcn.png'
    },
    {
      title: 'Ram Manohar Lohia Hospital',
      subtitle: 'Baba Kharak Singh Marg, Near Gurudwara Bangla Sahib, New Delhi',
      imageUrl: 'https://i.imgur.com/yHLfMBQ.jpg'
    },
    {
      title: 'Acharya Shree Bhikshu Hospital',
      subtitle: 'Moti Nagar, New Delhi',
      imageUrl: 'https://i.imgur.com/tMxp0tK.png'
    },
    {
      title: 'Lok Nayak Hospital',
      subtitle: 'Jawaharlal Nehru Marg, Delhi Gate, New Delhi',
      imageUrl: 'https://i.imgur.com/pKjYa1R.jpg'
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Flex container for text and images */}
      <div className="flex flex-col lg:flex-row items-start">
        {/* Left side: text and button */}
        <div className="lg:w-1/3 text-left lg:pr-8 mb-12 lg:mb-0">
          <h2 className="text-3xl font-bold mb-4">Locations</h2>
          <p className="text-lg text-gray-600 mb-6">
            Learn more about Delhi Govt Hospitals Location or choose a specific location.
          </p>
          <button className="px-6 py-2 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-md">
            Explore all locations
          </button>
        </div>

        {/* Right side: First two images (For large screens only) */}
        <div className="hidden lg:grid lg:w-2/3 grid-cols-2 gap-8 mb-8">
          {locations.slice(0, 2).map((location, index) => (
            <div
              key={index}
              className="relative rounded-lg overflow-hidden shadow-lg group h-80"
            >
              <img
                src={location.imageUrl}
                alt={location.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-75"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-semibold">{location.title}</h3>
                <p className="text-md">{location.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel for small screens */}
        <div className="lg:hidden">
          <Carousel
            showThumbs={false}
            infiniteLoop
            showStatus={false}
            autoPlay
            interval={3000}
          >
            {locations.map((location, index) => (
              <div key={index} className="relative">
                <img
                  src={location.imageUrl}
                  alt={location.title}
                  className="rounded-lg shadow-lg object-cover h-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-75"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-semibold">{location.title}</h3>
                  <p className="text-md">{location.subtitle}</p>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>

      {/* Bottom: Remaining three images (For large screens only) */}
      <div className="hidden lg:grid grid-cols-1 md:grid-cols-3 gap-8">
        {locations.slice(2).map((location, index) => (
          <div
            key={index}
            className="relative rounded-lg overflow-hidden shadow-lg group h-80"
          >
            <img
              src={location.imageUrl}
              alt={location.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-75"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-xl font-semibold">{location.title}</h3>
              <p className="text-md">{location.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Locations;
