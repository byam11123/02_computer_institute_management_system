import React from 'react';

interface CardCourseProps {
  id: string;
  title: string;
  description: string;
  duration: string;
  fee: number;
  syllabus: string;
}

const CardCourse: React.FC<CardCourseProps> = ({ 
  title, 
  description, 
  duration, 
  fee,
  syllabus 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
            {duration}
          </span>
          <span className="text-lg font-semibold text-gray-800">
            ₹{fee.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <a 
            href={syllabus} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            View Syllabus
          </a>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardCourse;