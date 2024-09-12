
const FreeConsultation = () => {
  return (
    <section className="bg-stone-200  rounded-full mt-10  py-16">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center justify-between">
        {/* Left Side */}
        <div className="lg:w-1/2 w-full text-left lg:text-left mt-10 lg:mt-0">
          <h2 className="text-xl font-semibold text-green-500 mb-2">Free Doctors</h2>
          <h1 className="text-4xl font-bold text-blue-900 mb-4">Get Free Consultation</h1>
          <p className="text-lg text-gray-700 mb-6">
            Access professional medical advice at no cost. Our free consultation services connect you with top doctors who are ready to assist you with your health concerns from the comfort of your home.
          </p>
          <h3 className="text-2xl font-semibold text-blue-900 mb-4">Consult a doctor anytime, anywhere by search</h3>
          <p className="text-gray-600 mb-6">
            Find the right doctor for your needs with our easy-to-use search feature. Our platform allows you to consult with qualified professionals no matter where you are, ensuring that you receive timely and accurate medical advice.
          </p>

          {/* Bullet Points */}
          <ul className="mb-6">
            <li className="flex items-center mb-4">
              <span className="w-4 h-4 bg-blue-600 rounded-full mr-3"></span>
              Connect with doctors in real-time
            </li>
            <li className="flex items-center mb-4">
              <span className="w-4 h-4 bg-blue-600 rounded-full mr-3"></span>
              Get advice on a wide range of health issues
            </li>
          </ul>

          <button className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-200">
            Explore More
          </button>
        </div>

        {/* Right Side */}
        <div className="lg:w-1/2 w-full flex justify-center lg:justify-end">
          <div className="relative">
            <img
              src="https://i.imgur.com/8fttQTa.png"
              alt="Doctor"
              className="w-72 h-96 object-cover rounded-lg shadow-lg"
            />
            <div className="absolute bottom-[-10px] left-[-10px] bg-white p-4 rounded-lg shadow-lg mr-6"> {/* Adjusted margin-right */}
              <h3 className="text-lg font-semibold text-blue-900">Active Doctors</h3>
              <p className="text-sm text-gray-500 mb-4">Free Consultation</p>
              <div className="flex items-center mb-2">
                <img
                  src="https://i.imgur.com/yfDQiSe.jpg"
                  alt="Dr. Leslie Alexander"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <h4 className="text-sm font-semibold text-gray-700">Dr. Leslie Alexander</h4>
                  <p className="text-xs text-gray-500">Surgery</p>
                </div>
              </div>
              <div className="flex items-center">
                <img
                  src="https://i.imgur.com/yfDQiSe.jpg"
                  alt="Dr. Ronald Richards"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <h4 className="text-sm font-semibold text-gray-700">Dr. Ronald Richards</h4>
                  <p className="text-xs text-gray-500">Anesthesiology</p>
                </div>
              </div>
              <button className="bg-blue-600 text-white py-2 px-4 mt-4 w-full rounded-lg hover:bg-blue-700 transition duration-200">
                Make a Call
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreeConsultation;
