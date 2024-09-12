
import { Timeline } from "../components/ui/timeline";

export function TimelineDemo() {
  const data = [
    {
      title: "Bed Allotment",
      content: (
        <div className="container mx-auto p-4 sm:p-6 md:p-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-start lg:space-x-12 space-y-4 lg:space-y-0">
            <div className="w-full lg:w-1/2">
              <img
                src="https://i.imgur.com/AUQjNRF.png"
                alt="Bed Allotment"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            <div className="w-full lg:w-1/2 mt-4 lg:mt-0">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4 leading-tight">
                Apply for Bed Allotment
              </h2>
              <p className="text-sm md:text-base font-semibold mb-2">
                Secure a Bed for Your Care
              </p>
              <p className="mb-4 text-sm md:text-base text-gray-700">
                Ensure your hospital stay is ready when you need it. Apply for a
                bed allotment today to guarantee availability and get timely
                medical attention.
              </p>
              <p className="text-sm md:text-base font-semibold mb-2">
                Quick and Easy Process
              </p>
              <p className="mb-4 text-sm md:text-base text-gray-700">
                Our simple application process helps you find and secure a bed
                swiftly.{" "}
                <a
                  href="#"
                  className="text-blue-600 underline hover:text-blue-800 transition duration-200"
                >
                  Learn more about the process and requirements.
                </a>
              </p>
              <button className="mt-4 px-3 md:px-6 py-2 md:py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition duration-300 shadow-lg">
                Apply for Bed Allotment
              </button>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Request Appointment",
      content: (
        <div className="container mx-auto p-4 sm:p-6 md:p-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-start lg:space-x-12 space-y-4 lg:space-y-0">
            <div className="w-full lg:w-1/2">
              <img
                src="https://i.imgur.com/ny65wl3.jpg"
                alt="Appointment Booking"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            <div className="w-full lg:w-1/2 mt-4 lg:mt-0">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4 leading-tight">
                Book Your Appointment
              </h2>
              <p className="text-sm md:text-base font-semibold mb-2">
                Secure Your Time with Our Doctors
              </p>
              <p className="mb-4 text-sm md:text-base text-gray-700">
                Ensure you get timely medical attention by booking your
                appointment in advance. Schedule your consultation with ease and
                avoid waiting time.
              </p>
              <p className="text-sm md:text-base font-semibold mb-2">
                Quick and Easy Process
              </p>
              <p className="mb-4 text-sm md:text-base text-gray-700">
                Our simple appointment booking process helps you find and secure
                your preferred time swiftly.{" "}
                <a
                  href="#"
                  className="text-blue-600 underline hover:text-blue-800 transition duration-200"
                >
                  Learn more about the process and requirements.
                </a>
              </p>
              <button className="mt-4 px-3 md:px-6 py-2 md:py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition duration-300 shadow-lg">
                Book an Appointment
              </button>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Check Health Report",
      content: (
        <div className="container mx-auto p-4 sm:p-6 md:p-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-start lg:space-x-12 space-y-4 lg:space-y-0">
            <div className="w-full lg:w-1/2">
              <img
                src="https://i.imgur.com/7aqnC9h.jpg"
                alt="Health Reports"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            <div className="w-full lg:w-1/2 mt-4 lg:mt-0">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4 leading-tight">
                View Your Health Reports
              </h2>
              <p className="text-sm md:text-base font-semibold mb-2">
                Access Your Medical History
              </p>
              <p className="mb-4 text-sm md:text-base text-gray-700">
                Stay informed about your health by easily checking your previous
                and latest medical reports. Review your health data anytime,
                anywhere.
              </p>
              <p className="text-sm md:text-base font-semibold mb-2">
                Quick and Secure Access
              </p>
              <p className="mb-4 text-sm md:text-base text-gray-700">
                Our system ensures that your health reports are always available
                for you to access securely.{" "}
                <a
                  href="#"
                  className="text-blue-600 underline hover:text-blue-800 transition duration-200"
                >
                  Learn more about how to access your reports.
                </a>
              </p>
              <button className="mt-4 px-3 md:px-6 py-2 md:py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition duration-300 shadow-lg">
                View Health Reports
              </button>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
}
