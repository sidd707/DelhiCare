import React, { useState } from 'react';
import Player from 'lottie-react';
import animationData from '../../Animation - 1724927655419.json';  // Import the Lottie animation JSON file

interface PopupDialogProps {
  title: string;
  description: string;
  onClose: () => void;
  onContinue: () => void;
  successMessage: string;  // New prop to display the success message
}

const PopupDialog: React.FC<PopupDialogProps> = ({ title, description, onClose, onContinue, successMessage }) => {
  const [showAnimation, setShowAnimation] = useState(false);

  const handleContinue = () => {
    setShowAnimation(true);
    setTimeout(() => {
      onContinue();
      onClose(); // Close the pop-up after animation
    }, 3000); // Adjust the timeout to match the animation duration
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full mx-4 relative">
        {!showAnimation ? (
          <>
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            <p className="text-gray-600 mb-6">{description}</p>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={handleContinue}
              >
                Continue
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <Player
              autoplay
              loop
              animationData={animationData}  // Pass the imported animation data here
              style={{ height: '150px', width: '150px' }}
            />
            <p className="mt-4 text-lg font-bold text-blue-400 font-sans">
              {successMessage}  {/* Display success message below the animation */}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PopupDialog;
