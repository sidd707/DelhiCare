'use client';

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const hospitals = [
  {
    name: 'All India Institute of Medical Sciences',
    availableBeds: 5,
    wardTypes: ['ICU', 'General', 'Emergency'],
    image: 'https://i.imgur.com/rYwnav1.jpg',
    location: 'AIIMS Campus, New Delhi',
  },
  {
    name: 'Ambedkar Nagar Hospital',
    availableBeds: 0,
    patientsInQueue: 12,
    wardTypes: ['ICU', 'Emergency'],
    image: 'https://i.imgur.com/WZ8VQcn.png',
    location: 'Dakshinpuri, New Delhi',
  },
  {
    name: 'Ram Manohar Lohia Hospital',
    availableBeds: 2,
    wardTypes: ['General', 'Emergency'],
    image: 'https://i.imgur.com/yHLfMBQ.jpg',
    location: 'Baba Kharak Singh Marg, New Delhi',
  },
  {
    name: 'Acharya Shree Bhikshu Hospital',
    availableBeds: 3,
    wardTypes: ['ICU', 'General'],
    image: 'https://i.imgur.com/tMxp0tK.png',
    location: 'Moti Nagar, New Delhi',
  },
  {
    name: 'Lok Nayak Hospital',
    availableBeds: 0,
    patientsInQueue: 8,
    wardTypes: ['General', 'Emergency'],
    image: 'https://i.imgur.com/pKjYa1R.jpg',
    location: 'Jawaharlal Nehru Marg, Delhi Gate, New Delhi',
  },
];

export default function table() {
  return (
    <Card className="max-w-full mt-24 rounded-lg mx-auto">
      <CardHeader className="px-6">
        <CardTitle className="text-3xl">Hospital Beds Availability</CardTitle>
        <CardDescription className="text-xl">List of hospitals with available beds and facilities.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table className="w-full text-xl">
          <TableHeader>
            <TableRow className="hidden md:table-row">
              <TableHead className=""></TableHead>
              <TableHead className="text-2xl">Hospitals</TableHead>
              <TableHead className="text-2xl">Location</TableHead>
              <TableHead className="text-2xl">Beds Available</TableHead>
              <TableHead className="text-2xl">Ward Types</TableHead>
              <TableHead className="text-2xl text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hospitals.map((hospital, index) => (
              <TableRow
                key={index}
                className="bg-accent flex flex-col md:table-row md:flex-row md:flex-nowrap md:space-x-4 space-y-4 md:space-y-0 p-4 border-b md:border-none transition-transform duration-300 ease-in-out transform hover:scale-105 hover:bg-white hover:shadow-lg hover:backdrop-blur-lg"
              >
                <TableCell className="w-full md:w-36 md:align-middle">
                  <img
                    src={hospital.image}
                    alt={hospital.name}
                    className="w-full h-32 md:w-36 md:h-24 object-cover rounded-lg"
                  />
                </TableCell>
                <TableCell className="flex flex-col justify-center md:align-middle">
                  <div className="font-semibold">{hospital.name}</div>
                  <div className="text-base text-muted-foreground md:hidden">
                    {hospital.location}
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell md:align-middle">
                  <div className="text-base text-muted-foreground">
                    {hospital.location}
                  </div>
                </TableCell>
                <TableCell className="flex justify-between md:table-cell md:align-middle">
                  {hospital.patientsInQueue ? (
                    <Badge variant="outline" className="md:text-base whitespace-nowrap">
                      In Queue: {hospital.patientsInQueue}
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="md:text-base whitespace-nowrap">
                      Available Beds: {hospital.availableBeds}
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="flex justify-between md:table-cell md:align-middle">
                  <div className="text-base md:text-lg">
                    {hospital.wardTypes.join(', ')}
                  </div>
                </TableCell>
                <TableCell className="flex justify-between md:table-cell md:align-middle text-right">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-5 py-2 text-xl font-bold leading-4 text-white shadow-sm hover:bg-gray-900 md:text-lg whitespace-nowrap"
                  >
                    {hospital.availableBeds === 0 ? 'Join Queue' : 'View Details'}
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
