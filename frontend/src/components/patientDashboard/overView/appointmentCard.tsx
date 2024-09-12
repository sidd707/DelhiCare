import React from 'react';
import { MdOutlineAccountCircle } from "react-icons/md";
import { CiCalendarDate, CiLocationOn } from "react-icons/ci";

interface Appointment {
  id: number;
  title: string;
  doctor: string;
  date: string;
  location: string;
  status: string;
}

const AppointmentCard: React.FC<Appointment> = ({ title, doctor, date, location, status }) => {
  return (
    <div className="p-4 bg-white shadow rounded-lg border border-gray-200 transform transition duration-300 hover:scale-105 hover:shadow-lg">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <span className={`text-${status === "Scheduled" ? 'orange-500' : 'gray-500'}`}>{status}</span>
      </div>
      <div className="flex items-center mb-2">
        <MdOutlineAccountCircle className="text-gray-500 mr-2" />
        <span className="text-gray-700">{doctor}</span>
      </div>
      <div className="flex items-center mb-2">
        <CiCalendarDate className="text-gray-500 mr-2" />
        <span className="text-gray-700">{date}</span>
      </div>
      <div className="flex items-center">
        <CiLocationOn className="text-gray-500 mr-2" />
        <span className="text-gray-700">{location}</span>
      </div>
    </div>
  );
};

export default AppointmentCard;
