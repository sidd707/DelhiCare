import React, { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { FaCalendarAlt, FaCalendarCheck } from "react-icons/fa";
import { IoMdBed } from "react-icons/io";
import { TbReportSearch } from "react-icons/tb";
import { GrContact } from "react-icons/gr";
import { MdEmail, MdAddIcCall } from "react-icons/md";
import { AiFillRobot } from "react-icons/ai";
import { MdOutlineManageAccounts } from "react-icons/md";
import { useNavigate, useLocation } from 'react-router-dom';
import { GiMedicines } from "react-icons/gi";
import { TbMessageCircle } from "react-icons/tb";

const Navbar: React.FC = () => {
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [contactDropdownOpen, setContactDropdownOpen] = useState(false);
  const [aiAssistantDropdownOpen, setAiAssistantDropdownOpen] = useState(false);
  const [click, setClick] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();  // Get the current route

  const toggleServicesDropdown = () => {
    setServicesDropdownOpen(!servicesDropdownOpen);
    setContactDropdownOpen(false);
    setAiAssistantDropdownOpen(false);
  };

  const toggleContactDropdown = () => {
    setContactDropdownOpen(!contactDropdownOpen);
    setServicesDropdownOpen(false);
    setAiAssistantDropdownOpen(false);
  };

  const toggleAiAssistantDropdown = () => {
    setAiAssistantDropdownOpen(!aiAssistantDropdownOpen);
    setServicesDropdownOpen(false);
    setContactDropdownOpen(false);
  };

  const handleClick = () => {
    setClick(!click);
  };

  const handleBed = () => {
    navigate('/bedallotment');
    setServicesDropdownOpen(false);
    setClick(false);
  };

  const handleAppointment = () => {
    navigate('/appointment');
    setServicesDropdownOpen(false);
    setClick(false);
  };

  const handlePatientDashboard = () => {
    navigate('/patientdashboard');
    setServicesDropdownOpen(false);
    setClick(false);
  };

  const handleMedInfo = () => {
    window.open('https://llmchatbot-dtlt9bfmcqup4kqek6yzfo.streamlit.app/', '_blank');
    setAiAssistantDropdownOpen(false);
    setClick(false);
  };

  const handleMedConsult = () => {
    window.open('https://llmchatbot2-a6x3gzlytjvvaoheyizu6r.streamlit.app/', '_blank');
    setAiAssistantDropdownOpen(false);
    setClick(false);
  };

  const isDropdownOpen = servicesDropdownOpen || contactDropdownOpen || aiAssistantDropdownOpen || click;

  // Apply dynamic background colors for routes other than '/dashboard'
  const backgroundColor = location.pathname === "/bedallotment"
    ? "bg-stone-100"
    : "bg-stone-200"; // Default for all other routes except dashboard

  return (
    <>
      <nav className={`relative z-10 ${isDropdownOpen ? 'bg-white' : backgroundColor} transition-colors duration-300`}>
        <div className="container mx-auto px-6 lg:px-8 py-2 flex justify-between items-center">
          {/* Logo */}
          <div className="text-2xl font-bold">
            <a href="/">DelhiCare</a>
          </div>

          {/* Menu */}
          <div className="space-x-8 hidden lg:flex">
            <a href="/" className="hover:text-blue-900">Home</a>
            <button onClick={toggleServicesDropdown} className="hover:text-blue-900">Services</button>
            <button onClick={toggleContactDropdown} className="hover:text-blue-900">Contact</button>
            <button onClick={toggleAiAssistantDropdown} className="hover:text-blue-900">AI Assistant</button>
        
          </div>

          {/* Login Button */}
          <button className="hidden lg:block font-semibold text-base lg:text-xl py-2 px-4 lg:px-6 text-white bg-neutral-900 rounded-lg transition-transform transform hover:scale-105">
            <a href='/login'>Login</a>
          </button>

          {/* Mobile Hamburger Menu */}
          <button className="lg:hidden block" onClick={handleClick}>
            {click ? <RxCross1 size={24} /> : <GiHamburgerMenu size={24} />}
          </button>
        </div>
      </nav>

      {/* Services Dropdown Menu */}
      {servicesDropdownOpen && (
        <div className="bg-white z-20 py-8 border-t border-black">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between md:space-x-40">
              <div className="text-start mb-8 md:mb-0">
                <div className="font-bold font-sans text-5xl">Services</div>
                <p className="text-sm text-gray-500">Explore our different services</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:flex-1">
                <button onClick={handleBed} className="flex flex-col items-start justify-start bg-white p-3 text-left transition transform hover:bg-stone-200 hover:scale-105 ml-4">
                  <IoMdBed className="text-4xl mb-1"/>
                  <span className="font-semibold font-sans text-lg">Bed Allotment</span>
                  <p className="text-sm text-gray-500">Find and reserve a bed immediately.</p>
                </button>
                <button onClick={handleAppointment} className="flex flex-col items-start justify-start bg-white p-3 text-left transition transform hover:bg-stone-200 hover:scale-105 ml-4">
                  <FaCalendarCheck className="text-3xl mb-1"/>
                  <span className="font-semibold font-sans text-lg">Doctor Appointment</span>
                  <p className="text-sm text-gray-500">Book your doctor consultation easily.</p>
                </button>
                <button className="flex flex-col items-start justify-start bg-white p-3 text-left transition transform hover:bg-stone-200 hover:scale-105 ml-4">
                  <TbReportSearch className="text-4xl mb-1"/>
                  <span className="font-semibold font-sans text-lg">Check Health Reports</span>
                  <p className="text-sm text-gray-500">Access and review your health records online.</p>
                </button>
                <button onClick={handlePatientDashboard} className="flex flex-col items-start justify-start bg-white p-3 text-left transition transform hover:bg-stone-200 hover:scale-105 ml-4">
                  <MdOutlineManageAccounts className="text-3xl mb-1"/>
                  <span className="font-semibold font-sans text-lg">Patient Dashboard</span>
                  <p className="text-sm text-gray-500">Access all your information</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Dropdown Menu */}
      {contactDropdownOpen && (
        <div className="bg-white z-20 py-8 border-t border-black">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between md:space-x-40">
              <div className="text-start mb-8 md:mb-0">
                <div className="font-bold font-sans text-5xl">Contact Us</div>
                <p className="text-sm text-gray-500">Reach out to us in various ways</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:flex-1">
                <button className="flex flex-col items-start justify-start bg-white p-3 text-left transition transform hover:bg-stone-200 hover:scale-105 ml-4">
                  <MdEmail className="text-3xl mb-1"/>
                  <span className="font-semibold font-sans text-lg">Contact via Email</span>
                  <p className="text-sm text-gray-500">support@example.com</p>
                </button>
                <button className="flex flex-col items-start justify-start bg-white p-3 text-left transition transform hover:bg-stone-200 hover:scale-105 ml-4">
                  <MdAddIcCall className="text-3xl mb-1" />
                  <span className="font-semibold font-sans text-lg">Call Us</span>
                  <p className="text-sm text-gray-500">+1 800 123 4567</p>
                </button>
                
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Assistant Dropdown Menu */}
      {aiAssistantDropdownOpen && (
        <div className="bg-white z-20 py-8 border-t border-black">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between md:space-x-40">
              <div className="text-start mb-8 md:mb-0">
                <div className="font-bold font-sans text-5xl">AI Assistant</div>
                <p className="text-sm text-gray-500">Explore our AI Assistant features</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:flex-1">
                <button onClick={handleMedInfo} className="flex flex-col items-start justify-start bg-white p-3 text-left transition transform hover:bg-stone-200 hover:scale-105 ml-4">
                  <GiMedicines className="text-4xl mb-1"/>
                  <span className="font-semibold font-sans text-lg">AI Medicine Information</span>
                  <p className="text-sm text-gray-500">Get instant answers and assistance with our intelligent chat system.</p>
                </button>
                <button onClick={handleMedConsult} className="flex flex-col items-start justify-start bg-white p-3 text-left transition transform hover:bg-stone-200 hover:scale-105 ml-4">
                  <TbMessageCircle className="text-4xl mb-1"/>
                  <span className="font-semibold font-sans text-lg">AI Health Consultation</span>
                  <p className="text-sm text-gray-500">Get instant answers and assistance with our intelligent chat system.</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {click && (
        <div className="lg:hidden bg-white text-black z-50 h-screen overflow-y-auto">
          <div className="flex justify-between items-center p-4 border-b border-gray-600">
            <span className="text-lg font-semibold">Menu</span>
            <button onClick={handleClick}>
              <RxCross1 size={24} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-0 text-black p-4">
            <div className="p-4 text-left flex flex-col items-start justify-center">
              <FaCalendarAlt className="text-2xl mb-2" />
              <a href="#" className="text-black">Appointment</a>
            </div>
            <div className="p-4 text-left flex flex-col items-start justify-center">
              <IoMdBed className="text-3xl mb-2" />
              <a href="#" className="text-black">Bed Allotment</a>
            </div>
            <div className="p-4 text-left flex flex-col items-start justify-center">
              <TbReportSearch className="text-2xl mb-2" />
              <a href="#" className="text-black">Health Reports</a>
            </div>
            <div className="p-4 text-left flex flex-col items-start justify-center">
              <GrContact className="text-2xl mb-2" />
              <a href="#" className="text-black">Contact Us</a>
            </div>
            <div className="p-4 text-left flex flex-col items-start justify-center">
              <AiFillRobot className="text-2xl mb-2" />
              <a href="#" className="text-black">AI Assistant</a>
            </div>
          </div>

          <div className="w-full p-4">
            <ul className="text-black bg-stone-200 text-xl p-0 m-0">
              <li className="my-0 py-4 border-b border-neutral-600 w-full">
                <a href="#" className="block w-full text-center text-black">Home</a>
              </li>
              <li className="my-0 py-4 border-b border-neutral-600 w-full">
                <a href="#" className="block w-full text-center text-black">About Us</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

