
const TopRatedDoctors = () => {
  const doctorsData = [
    {
      name: 'Dr. Kevin Lowe',
      role: 'Dentist',
      image: 'https://i.imgur.com/iPFTHHa.png',
      social: {
        facebook: '#',
        twitter: '#',
        linkedin: '#',
      },
    },
    {
      name: 'Dr. Vansh',
      role: 'Chiropractor',
      image: 'https://i.imgur.com/cknJI4l.png',
      social: {
        facebook: '#',
        twitter: '#',
        linkedin: '#',
      },
    },
    {
      name: 'Dr. Sarthak',
      role: 'Endodontist',
      image: 'https://i.imgur.com/WMSJYoh.png',
      social: {
        facebook: '#',
        twitter: '#',
        linkedin: '#',
      },
    },
    {
      name: 'Dr. Suryansh',
      role: 'Optometrist',
      image: 'https://i.imgur.com/iehq3kw.png',
      social: {
        facebook: '#',
        twitter: '#',
        linkedin: '#',
      },
    },
  ];

  return (
    <section id="top-rated-doctors" className="bg-stone-100 py-16 sm:py-24 lg:py-32">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">Our Top Rated Doctors</h2>
        <p className="text-lg text-gray-600 mb-12">
          Meet our top-rated medical professionals who are recognized for their exceptional care, expertise, and dedication to their patients. Trust our highly qualified doctors to provide you with the best possible medical attention.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {doctorsData.map((doctor, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-md p-6 text-center relative transform transition-transform duration-300 hover:scale-105 hover:shadow-lg" // Added hover effect
            >
              <img
                src={doctor.image}
                alt={`Doctor ${doctor.name}`}
                className="w-full h-48 object-cover mb-4 rounded-lg" // Rectangle style
              />
              <h3 className="text-xl font-semibold mb-2">{doctor.name}</h3>
              <p className="text-gray-600">{doctor.role}</p>

              <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-4">
                <a href={doctor.social.facebook} className="text-blue-500 hover:text-blue-700">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href={doctor.social.twitter} className="text-blue-400 hover:text-blue-600">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href={doctor.social.linkedin} className="text-blue-600 hover:text-blue-800">
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopRatedDoctors;
