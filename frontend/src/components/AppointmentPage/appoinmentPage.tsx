
import { BgVideo2 } from '../bgvideo/Bgvideo2';

import AppointmentFeatures from './appointmentFeatures';
import TopRatedDoctors from './topRatedDoctors';
import FreeConsultation from './freeConsultation';

export default function AppoinmentPage() {
  const services = [
    {
      title: 'Physiotherapy',
      description: 'Comprehensive physiotherapy services to help you recover and stay active.',
      image: 'https://i.imgur.com/OYsMMWN.png', // Replace with actual path to the image
    },
    {
      title: 'Cardiology',
      description: 'Expert cardiology services to take care of your heart health.',
      image: 'https://i.imgur.com/DAUBm7s.png', // Replace with actual path to the image
    },
    {
      title: 'Gynecology',
      description: 'Comprehensive women\'s health services for all stages of life.',
      image: 'https://i.imgur.com/Cbfm1I4.png', // Replace with actual path to the image
    },
    {
      title: 'Neurology',
      description: 'Advanced neurological care for your well-being.',
      image: 'https://i.imgur.com/AgclbR0.png', // Replace with actual path to the image
    },
    // Add more services as needed
  ];

  return (
    <div className="relative bg-stone-200 w-full pt-6 sm:pt-8 lg:pt-10 pb-16 sm:pb-20 lg:pb-24">
      <div className="relative w-full lg:w-[90vw] xl:w-[97vw] max-w-none mx-auto rounded-xl overflow-hidden">
        <BgVideo2 className="rounded-xl" />

        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col justify-center p-8 sm:p-10 md:p-12 lg:p-20">
          {/* Top-left Text */}
          <div className="absolute top-8 left-8 text-black">
            <h2 className="text-lg sm:text-xl font-bold">Book Doctor Appointment</h2>
            <p className="text-sm sm:text-base">From anywhere</p>
          </div>

          {/* Quote Text (Bottom-left) */}
          <div className="absolute bottom-8 left-8 text-black">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-lg font-bold">
                &ldquo;
              </div>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                Book your <span className="underline">online doctor appointment</span> effortlessly from the comfort of your home
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Dynamic Card Section */}
      <div className="pt-12 sm:pt-16 lg:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
            Our Health Care Services
          </h2>
          <p className="mt-4 text-center text-lg text-gray-500">
            Discover our wide range of services designed to meet your health care needs.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-6 text-center transform transition-transform duration-300 hover:scale-105"
              >
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-16 h-16 mx-auto mb-4 object-cover rounded-full" 
                />
                <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                <p className="mt-2 text-gray-600">{service.description}</p>
                <a href="#" className="mt-4 inline-block text-blue-600 font-semibold">Learn More</a>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>

      </div>
      <div className="mt-16">
       
      
        <AppointmentFeatures/>
        
      </div>
      <div className=''>
      <TopRatedDoctors/>
      </div>
      <div className=''>
      <FreeConsultation/>
      </div>
    </div>
  );
}
