
const AppointmentFeatures = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-screen-xl mx-auto py-8 px-4 lg:py-16 lg:px-6">
        <div className="text-center mb-10">
          <h2 className="text-4xl tracking-tight font-bold text-primary-800">
            Why Choose Our Doctor Appointment Services?
          </h2>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="mr-0 md:mr-8 mb-6 md:mb-0">
            <img
              className="w-1/2 md:w-full mx-auto"
              src="https://i.imgur.com/yfDQiSe.jpg"
              alt="doctor_appointment_banner"
            />
          </div>

          <div className="flex-1 flex flex-col sm:flex-row flex-wrap -mb-4 -mx-2">
            <div className="w-full sm:w-1/2 mb-4 px-2">
              <div className="h-full py-4 px-6 border border-blue-500 border-t-0 border-l-0 rounded-br-xl">
                <h3 className="text-2xl font-bold text-md mb-6">Instant Online Booking:</h3>
                <p className="text-sm">
                  Book your doctor appointments instantly with just a few clicks, anytime and anywhere, ensuring you get
                  timely medical care without the hassle of long waits.
                </p>
              </div>
            </div>
            <div className="w-full sm:w-1/2 mb-4 px-2">
              <div className="h-full py-4 px-6 border border-blue-500 border-t-0 border-l-0 rounded-br-xl">
                <h3 className="text-2xl font-bold text-md mb-6">Personalized Doctor Matching</h3>
                <p className="text-sm">
                  Our platform matches you with the best doctors based on your specific health needs and preferences,
                  ensuring personalized care for every patient.
                </p>
              </div>
            </div>

            <div className="w-full sm:w-1/2 mb-4 px-2">
              <div className="h-full py-4 px-6 border border-blue-500 border-t-0 border-l-0 rounded-br-xl">
                <h3 className="text-2xl font-bold text-md mb-6">Telemedicine Options</h3>
                <p className="text-sm">
                  Access top-notch healthcare services through our secure telemedicine options, allowing you to consult
                  with doctors from the comfort of your home.
                </p>
              </div>
            </div>

            <div className="w-full sm:w-1/2 mb-4 px-2">
              <div className="h-full py-4 px-6 border border-blue-500 border-t-0 border-l-0 rounded-br-xl">
                <h3 className="text-2xl font-bold text-md mb-6">Secure Health Records</h3>
                <p className="text-sm">
                  Your health records are stored securely, accessible only by you and your doctor, ensuring your privacy
                  and confidentiality at all times.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentFeatures;
