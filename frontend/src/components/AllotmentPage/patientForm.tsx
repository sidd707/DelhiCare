import React, { useEffect, useState } from "react";

interface PatientFormProps {
  onClose: () => void;
  onSubmit: (formData: any) => void;
}

export function PatientForm({ onClose, onSubmit }: PatientFormProps) {
  const [formData, setFormData] = useState({
    patientName: "",
    age: "",
    gender: "male",
    mobile: "",
    email: "",
    address: {
      street: "",
      locality: "",
      city: "",
      pincode: "",
    },
    latitude: "",
    longitude: "",
    wardType: "general",
    reason: "",
    medicalCondition: "",
    emergencyContactName: "",
    emergencyContactNo: "",
  });

  useEffect(() => {
    document.body.style.overflow = "hidden"; // Disable scroll when form is open

    // Fetch user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude.toString();
          const longitude = position.coords.longitude.toString();
          setFormData((prevData) => ({
            ...prevData,
            latitude,
            longitude,
          }));
        },
        (error) => {
          console.error("Error fetching geolocation:", error);
          if (error.code === error.PERMISSION_DENIED) {
            alert("Location permission was denied. Please enable location services.");
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            alert("Location information is unavailable.");
          } else if (error.code === error.TIMEOUT) {
            alert("The request to get user location timed out.");
          } else {
            alert("An unknown error occurred while fetching location.");
          }
        },
        {
          timeout: 10000, // Set a timeout (in milliseconds)
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }

    return () => {
      document.body.style.overflow = "auto"; // Re-enable scroll when form is closed
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    if (id in formData.address) {
      setFormData((prevState) => ({
        ...prevState,
        address: { ...prevState.address, [id]: value },
      }));
    } else {
      setFormData((prevState) => ({ ...prevState, [id]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData); // Logs the filled form data to the console
    onSubmit(formData); // Pass the form data to the parent component
    onClose(); // Optionally close the form after submission
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative max-w-xl w-full h-[80vh] mx-auto rounded-lg p-6 md:p-8 shadow-input bg-white overflow-y-auto">
        <button
          className="absolute top-4 right-4 text-black"
          onClick={onClose}
          aria-label="Close Patient Form"
        >
          &times; {/* Close Button */}
        </button>

        <h2 className="font-bold text-2xl text-neutral-800">Patient Registration</h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2">
          Please fill out the form to register the patient.
        </p>

        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="patientName" className="block text-sm font-medium text-gray-700">
              Patient Name
            </label>
            <input
              id="patientName"
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              value={formData.patientName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">
              Age
            </label>
            <input
              id="age"
              type="number"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              value={formData.age}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <select
              id="gender"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              value={formData.gender}
              onChange={handleInputChange}
              required
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
              Mobile No.
            </label>
            <input
              id="mobile"
              type="tel"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              value={formData.mobile}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="street" className="block text-sm font-medium text-gray-700">
              Street
            </label>
            <input
              id="street"
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              value={formData.address.street}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="locality" className="block text-sm font-medium text-gray-700">
              Locality
            </label>
            <input
              id="locality"
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              value={formData.address.locality}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              id="city"
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              value={formData.address.city}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
              Pin Code
            </label>
            <input
              id="pincode"
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              value={formData.address.pincode}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="wardType" className="block text-sm font-medium text-gray-700">
              Ward Type
            </label>
            <select
              id="wardType"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              value={formData.wardType}
              onChange={handleInputChange}
              required
            >
              <option value="general">General</option>
              <option value="icu">ICU</option>
              <option value="emergency">Emergency</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
              Reason for Admission
            </label>
            <input
              id="reason"
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              value={formData.reason}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="medicalCondition" className="block text-sm font-medium text-gray-700">
              Existing Medical Conditions
            </label>
            <input
              id="medicalCondition"
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              value={formData.medicalCondition}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="emergencyContactName" className="block text-sm font-medium text-gray-700">
              Emergency Contact Name
            </label>
            <input
              id="emergencyContactName"
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              value={formData.emergencyContactName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="emergencyContactNo" className="block text-sm font-medium text-gray-700">
              Emergency Contact No.
            </label>
            <input
              id="emergencyContactNo"
              type="tel"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              value={formData.emergencyContactNo}
              onChange={handleInputChange}
              required
            />
          </div>

          <button
            className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md"
            type="submit"
          >
            Register Patient
          </button>
        </form>
      </div>
    </div>
  );
}
