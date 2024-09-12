
export function DoctorProfile() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between bg-white shadow-lg rounded-lg p-8 lg:p-12">
      {/* Doctor Image */}
      <div className="w-full lg:w-1/3 flex justify-center">
        <div className="relative">
          <img
            src="path-to-doctor-image.jpg" // Replace with the actual image path
            alt="Doctor"
            className="w-48 h-48 lg:w-60 lg:h-60 rounded-full object-cover border-4 border-blue-600"
          />
          <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-4 pt-4">
            <a href="#" className="bg-blue-600 text-white p-2 rounded-full">
              <i className="fab fa-facebook-f"></i> {/* Replace with FontAwesome or any other icon library */}
            </a>
            <a href="#" className="bg-blue-600 text-white p-2 rounded-full">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="bg-blue-600 text-white p-2 rounded-full">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Doctor Description */}
      <div className="w-full lg:w-2/3 mt-8 lg:mt-0 lg:ml-8">
        <h3 className="text-xl lg:text-2xl font-bold text-gray-900">
          Quality healthcare starts with quality doctors
        </h3>
        <p className="mt-4 text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisl massa egestas vitae metus vel enim facilisis. Enim tempor ac euismod tellus maecenas pellentesque.
        </p>
        <p className="mt-6 font-semibold text-gray-900">Dr. Esther Howard</p>
        <p className="text-blue-600">Neurology</p>
        <p className="mt-2 text-gray-500">Esther Howard</p>
      </div>
    </div>
  );
}
