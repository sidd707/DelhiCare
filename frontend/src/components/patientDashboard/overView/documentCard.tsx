import React from 'react';
import { FaDownload } from "react-icons/fa";

interface Document {
  name: string;
  size: string;
}

interface DocumentsCardProps {
  documents: Document[];
}

const DocumentsCard: React.FC<DocumentsCardProps> = ({ documents }) => {
  return (
    <div className="p-4 bg-white shadow rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Documents</h3>
        <a href="/documents" className="text-blue-500">View all</a>
      </div>
      {documents.map((document, index) => (
        <div 
          key={index} 
          className="mb-4 flex justify-between items-center p-2 rounded-md transition-colors duration-300 hover:bg-indigo-100"
        >
          <div>
            <p className="font-semibold">{document.name}</p>
            <p className="text-gray-600">{document.size}</p>
          </div>
          <a href={`/path-to-your-document/${document.name}`} download className="text-blue-500">
            <FaDownload className="text-xl" />
          </a>
        </div>
      ))}
    </div>
  );
};

export default DocumentsCard;
