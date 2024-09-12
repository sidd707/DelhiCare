
import AppointmentCard from '../overView/appointmentCard';
import InsuranceDetails from '../overView/insuranceDetails';
import MessageBoard from '../overView/messageBoard';
import PrescriptionsCard from '../overView/prescriptionsCard';
import DocumentsCard from '../overView/documentCard';

const appointments = [
  {
    id: 1,
    title: "Laser Vein Retreatment",
    doctor: "Dr Suryansh",
    date: "16 Dec, 08:00 am",
    location: "Ambedkar Nagar Hospital",
    status: "Scheduled",
  },
  {
    id: 2,
    title: "Consult: Vansh",
    doctor: "Dr Vansh",
    date: "24 Dec, 09:00 pm",
    location: "AIIMS Delhi",
    status: "Scheduled",
  },
  {
    id: 3,
    title: "Treatment for Backpain",
    doctor: "Dr Sarthak",
    date: "26 Dec, 11:00 am",
    location: "Lok Nayak Hospital",
    status: "Scheduled",
  },
];

const insurances = [
  {
    name: "Health Insurance",
    policyNumber: "DZW092281000",
    group: "Group P1",
    startDate: "01/01/2020",
    endDate: "01/01/2030",
  },
  {
    name: "Family Term Insurance",
    policyNumber: "ZZA156947Q929",
    group: "Group P2",
    startDate: "01/09/2012",
    endDate: "01/09/2022",
  },
];

const messages = [
  {
    title: "MRI Scan Report",
    content: "Can you please share the scan report of lungs",
    timestamp: "12/12/2020, 09:54 am",
    avatar: "https://i.imgur.com/GjvlojZ.png", // Example avatar
  },
  {
    title: "Blood Test",
    content: "Blood test has been done for checking the sugar level",
    timestamp: "11/12/2020, 12:54 pm",
    avatar: "https://i.imgur.com/cxKBB0P.png", // Example avatar
  },
];
const prescriptions = [
    {
      name: "Paracetamol",
      dosage: "2 Pills, Morning & Night",
      avatar: "https://i.imgur.com/7JvfKBf.png", // Example avatar
    },
    {
      name: "Ibuprofen",
      dosage: "1 Pill, Morning",
      avatar: "https://i.imgur.com/kJOBIA7.png", // Example avatar
    },
    {
      name: "Amoxicillin",
      dosage: "1 Pill, Morning & Night",
      avatar: "https://i.imgur.com/kVrfXHW.png", // Example avatar
    },
    {
      name: "Metformin",
      dosage: "1 Pill, Night",
      avatar: "https://i.imgur.com/LIHQqqL.png", // Example avatar
    },
  ];
  

const documents = [
  {
    name: "Medical Checkup Report",
    size: "2.6 Mb",
  },
  {
    name: "Blood Test",
    size: "2.3 Mb",
  },
  {
    name: "CT Scan",
    size: "1.4 Mb",
  },
  {
    name: "Lungs MRI Scan",
    size: "1.2 Mb",
  },
];

export default function OverView() {
  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Appointment Schedule */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Appointment Schedule</h2>
        <a href="appointmentDetails" className="text-blue-500">View all</a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {appointments.map((appointment) => (
          <AppointmentCard key={appointment.id} {...appointment} />
        ))}
      </div>

      {/* Additional Components Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <InsuranceDetails insurances={insurances} />
        <MessageBoard messages={messages} />
      </div>

      {/* Prescriptions and Documents Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <PrescriptionsCard prescriptions={prescriptions} />
        <DocumentsCard documents={documents} />
      </div>
    </div>
  );
}
