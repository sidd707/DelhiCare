import React from 'react';

interface Message {
  title: string;
  content: string;
  timestamp: string;
  avatar?: string; // Optional avatar URL
}

interface MessageBoardProps {
  messages: Message[];
}

const MessageBoard: React.FC<MessageBoardProps> = ({ messages }) => {
  return (
    <div className="p-4 bg-white shadow rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Message Board</h3>
        <a href="/messageBoard" className="text-blue-500">View all</a>
      </div>
      {messages.map((message, index) => (
        <div 
          key={index} 
          className="mb-4 flex items-start p-2 rounded-md transition-colors duration-300 hover:bg-indigo-100"
        >
          {/* Profile Image */}
          {message.avatar && (
            <img
              src={message.avatar}
              alt="Profile"
              className="w-10 h-10 rounded-full mr-4"
            />
          )}
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <p className="font-semibold">{message.title}</p>
              <span>{message.timestamp}</span>
            </div>
            <p className="text-gray-600">{message.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageBoard;
