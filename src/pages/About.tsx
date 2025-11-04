import React from 'react';

const About: React.FC = () => {
  return (
    <>
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8">About Our Institute</h1>
          
          <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="text-gray-700 mb-4">
              Founded in 2020, our computer institute has been at the forefront of technology education, 
              providing students with the skills needed to excel in the digital economy. We believe in 
              practical, hands-on learning that prepares our students for real-world challenges.
            </p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-4">
              Our mission is to empower individuals with the knowledge and skills required to thrive 
              in the rapidly evolving field of technology. We strive to provide high-quality education 
              that bridges the gap between academic knowledge and industry requirements.
            </p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4">Why Choose Us</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Experienced faculty with industry expertise</li>
              <li>Industry-relevant curriculum</li>
              <li>Small class sizes for personalized attention</li>
              <li>Hands-on projects and practical training</li>
              <li>Career placement assistance</li>
              <li>Flexible scheduling options</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4">Our Facilities</h2>
            <p className="text-gray-700 mb-4">
              Our state-of-the-art facilities include modern computer labs, high-speed internet, 
              interactive learning tools, and a library with the latest technology books and resources. 
              We provide a conducive environment for learning and innovation.
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default About;